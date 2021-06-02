import React, { useReducer } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Exercise from './Exercise';
// import Rest from './Rest';

const MODES = {
  REPS_FIXED: 'repsFixed',
  TIME_FIXED: 'timeFixed',
  REPS_TARGET: 'repsTarget',
  TIME_TARGET: 'timeTarget',
}

function initializer(exercises) {
  const items = exercises.map((exercise) => {
    const { mode } = exercise;

    switch(mode.current) {
      case MODES.REPS_FIXED:
        exercise.session = {
          // rest: true,
          isStarting: true,
          isFinished: false,
          count: mode[mode.current],
        }
        return exercise
        
      case MODES.TIME_FIXED:
        exercise.session = {
          // rest: false,
          isStarting: true,
          isFinished: false,
          count: mode[mode.current].min * 60 * 1000 + mode[mode.current].sec * 1000
        }
        return exercise

      case MODES.REPS_TARGET:
        exercise.session = {
          // rest: false,
          isStarting: true,
          isFinished: false,
          count: 0,
        }
        return exercise

      case MODES.TIME_TARGET:
        exercise.session = {
          // rest: false,
          isStarting: true,
          isFinished: false,
          count: 0
        }
        return exercise
    }
  });

  return {
    index: 0,
    items,
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
  }
}

function Train({navigation, route:{params:{exercises}}}) {
  const [store, dispatch] = useReducer(reducer, exercises, initializer)

  return (
    <>
      <View style={styles.container}>
        <Exercise store={store} dispatch={dispatch} MODES={MODES}/>

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
  }
})

export default Train;