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
      sessionStart: 0,
      sessionEnd: 0,
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

    case 'setTime':
      return {...store, sessionStart: new Date()}
  }
}

function Train({navigation, route:{params:{exercises, workoutName, workoutId}}}) {
  const {db, parentExercises, workoutSessions, timestamp: TIMESTAMP, increment } = useDB()

  const [store, dispatch] = useReducer(reducer, exercises, initializer);

  useEffect(() => {
    dispatch({ type: 'setTime' })
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
    const millis = Date.now() - store.sessionStart.valueOf();
    const itemsCount = store.items.length;
    const completedItemsCount = store.items.filter(item => {
      return item.session.isFinished
    }).length

    const batch = db().batch();
    const timestamp = TIMESTAMP;
    const newWorkoutSessionRef = workoutSessions.ref.doc();

    batch.set(newWorkoutSessionRef, {
      createdOn: timestamp,
      workoutName: workoutName,
      sessionStart: store.sessionStart,
      sessionEnd: new Date(),
      exerciseCount: itemsCount,
      completedExercisesCount: completedItemsCount,
      duration: millis,
    }, { merge: true })

    batch.set(workoutSessions.tally, {
      workoutSession_count: increment,
    }, { merge: true })

    store.items.forEach(item => {
      const newExerciseSessionRef = parentExercises.ref.doc(item.parentExercise_ref).collection("exerciseSessions").doc()

      const exerciseStats = {
        exerciseName: item.exerciseName,
        mode: item.mode.current,

        start: item.session.start,
        end: item.session.end,
        count: item.session.count,
        [item.weight.current]: item.weight[item.weight.current],
      }

      batch.set(newExerciseSessionRef, {
        createdOn: timestamp,
        ...exerciseStats,
      }, { merge: true })

      batch.set(newWorkoutSessionRef, {
        exercises: db.FieldValue.arrayUnion(exerciseStats),
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
          navigation.navigate("TrainComplete", { items: store.items, workoutName: workoutName, stats: handleSubmit() })
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
