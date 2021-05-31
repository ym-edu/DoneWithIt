import React, { useReducer } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const ACTIONS = {
  REPS_FIXED: 'repsFixed',
  TIME_FIXED: 'timeFixed',
  REPS_TARGET: 'repsTarget',
  TIME_TARGET: 'timeTarget',
}

function initializer(exercises) {
  return exercises.map(({mode}) => {
    switch(mode.current) {

      case ACTIONS.REPS_FIXED:
        return {
          isStarting: true,
          isFinished: false,
          count: mode[mode.current],
        }
        
      case ACTIONS.TIME_FIXED:
        return {
          isStarting: true,
          isFinished: false,
          count: mode[mode.current].min * 60 * 1000 + mode[mode.current].sec * 1000
        }

      case ACTIONS.REPS_TARGET:
        return {
          isStarting: true,
          isFinished: false,
          count: 0,
        }

      case ACTIONS.TIME_TARGET:
        return ({
          isStarting: true,
          isFinished: false,
          count: 0
        })
    }
  });
}

function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.REPS_FIXED:
      console.log(state)
      return state
    case ACTIONS.TIME_FIXED:
      console.log(state)
      return state
    case ACTIONS.REPS_TARGET:
      console.log(state)
      return state
    case ACTIONS.TIME_TARGET:
      console.log(state)
      return state
  }
}

function Train({navigation, route:{params:{exercises}}}) {
  const [state, dispatch] = useReducer(reducer, exercises, initializer)

  return (
    <>
      <View style={styles.container}>
        <Button title={'log'} onPress={() => console.log(state)}/>
        <Button title={'back'} onPress={() => navigation.pop()}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Train;