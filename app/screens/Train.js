import React, { useReducer, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Exercise from './Exercise';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import { useDB } from '../hooks/useDB';
// import Rest from './Rest';

const MODES = {
  REPS_FIXED: 'repsFixed',
  TIME_FIXED: 'timeFixed',
  REPS_TARGET: 'repsTarget',
  TIME_TARGET: 'timeTarget',
}

function selector(mode, exercise) {
  switch(mode.current) {
    case MODES.REPS_FIXED:
      exercise.session = {
        // rest: true,
        isStarting: true,
        isFinished: false,
        start: mode[mode.current],
        end: 0,
        count: mode[mode.current],
      }

      return exercise
      
    case MODES.REPS_TARGET:
      exercise.session = {
        // rest: false,
        isStarting: true,
        isFinished: false,
        start: 0,
        end: exercise.mode[mode.current],
        count: 0,
      }
      
      return exercise
        
    case MODES.TIME_FIXED:
      exercise.session = {
        // rest: false,
        isPaused: true,
        isStarting: true,
        isFinished: false,
        start: mode[mode.current].min * 60 * 1000 + mode[mode.current].sec * 1000,
        end: 0,
        count: mode[mode.current].min * 60 * 1000 + mode[mode.current].sec * 1000,
      }

      return exercise

    case MODES.TIME_TARGET:
      exercise.session = {
        // rest: false,
        isPaused: true,
        isStarting: true,
        isFinished: false,
        start: 0,
        end: mode[mode.current].min * 60 * 1000 + mode[mode.current].sec * 1000,
        count: 0,
      }

      return exercise
  }
}

function initializer(data) {
  if(Array.isArray(data)) {
    const items = data.map((exercise) => {
      const { mode } = exercise;
      return selector(mode, exercise)
    });

    return {
      index: 0,
      items,
      time: 0,
    }
  } else {
    const { mode } = data

    return selector(mode, data)
  }
}

function reducer(store, action) {
  let state;
  let element;

  switch(action.type) {
    case 'next':
      return {...store, index: store.index += 1}

    case 'previous':
      return {...store, index: store.index -= 1}

    case 'decrementCount':
      state = [...store.items]
      element = state[store.index]
      element.session.count -= 1

      return {...store, items: state}

    case 'incrementCount':
      state = [...store.items]
      element = state[store.index]
      element.session.count += 1

      return {...store, items: state}
    
    case 'countDown':
      state = [...store.items]
      element = state[store.index]
      element.session.count -= 1000

      return {...store, items: state}

    case 'countUp':
      state = [...store.items]
      element = state[store.index]
      element.session.count += 1000

      return {...store, items: state}

    case 'pause':
      state = [...store.items]
      element = state[store.index]
      element.session.isPaused = !element.session.isPaused

      return {...store, items: state}

    case 'setStarting':
      state = [...store.items]
      element = state[store.index]
      element.session.isStarting = false

      return {...store, items: state}

    case 'setFinished':
      state = [...store.items]
      element = state[store.index]
      element.session.isFinished = true

      return {...store, items: state}

    case 'reset':
      state = [...store.items]
      state[store.index] = initializer(action.payload)

      return {...store, items: state}

    case 'time':
      return {...store, time: Date.now()}
  }
}

function Train({navigation, route:{params:{exercises, routineName, routineId}}}) {
  const {db, workouts, timestamp } = useDB()

  const [store, dispatch] = useReducer(reducer, exercises, initializer);

  useEffect(() => {
    dispatch({ type: 'time' })
  }, [])

  function Buttons() {
    return (
      <>
        <Button title={'log'} onPress={() => {
          console.log(store.items)
          // console.log(store.index)
          // console.log(store.items.length)
        }}/>

        <Button title={'back'} onPress={() => navigation.pop()}/>

        {/* <Button title={`TEST: 'action'`} onPress={() => {
            dispatch({ type: 'action' })
          }
        }}/> */}
      </>
    )
  }

  const handleSubmit = () => {
    const millis = Date.now() - store.time;
    const itemsCount = store.items.length;
    const completedItemsCount = store.items.filter(item => {
      return item.session.isFinished
    }).length

    const batch = db().batch();
    const newRef = workouts.ref.doc(routineId).collection("routineSessions").doc();

    batch.set(newRef, {
      created: timestamp,
      duration: millis,
      completedItemsCount,
    }, { merge: true });
    
    store.items.forEach(item => {
      batch.set(newRef, {
        exercises: db.FieldValue.arrayUnion({
          exerciseName: item.exerciseName,
          parentExercise_ref: item.parentExercise_ref,
          childExercise_ref: item.id,
          mode: item.mode.current,
          [item.weight.current]: item.weight[item.weight.current],
          isCompleted: item.session.isFinished,
          goal: item.session.end,
          result: item.session.count,
        }),
      }, { merge: true })
    })

    batch.commit();

    return { duration: millis, completedItemsCount, itemsCount }
  }

  function FinishWorkout() {
    return (
      <View>
        <Spacer mV={8} style={styles.line}/>
        <TextButton onPress={() => {
          navigation.navigate("TrainComplete", { items: store.items, routineName: routineName, stats: handleSubmit() })
        }}>
          finish workout
        </TextButton>
        <Spacer mV={8}/>
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <Exercise store={store} dispatch={dispatch} MODES={MODES}/>
        {/* <Buttons/> */}
        {store.index === store.items.length - 1 ? <FinishWorkout/> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
})

export default Train;
