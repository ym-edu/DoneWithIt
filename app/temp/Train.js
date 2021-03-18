import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Controls from '../components/Controls/Controls';

import { workout } from '../config'
import { initializeReps, initializeTime } from '../components/Controls/utils';

function Train() {
  workout.forEach(exercise => {
    const { data:{mode} } = exercise
    switch(mode) {
      case 'r1':
        return initializeReps(exercise);
      case 'r2':
        return initializeReps(exercise);
      case 't1':
        return initializeTime(exercise);
      case 't2':
        return initializeTime(exercise);
    }
  })

  const state = useRef([])

  if (workout.length > 0) {
    const initialState = workout.map(exercise => exercise.session);
    state.current = initialState
  }

  return (
    <View style={styles.screen}>
      <Controls
      workout={workout}
      state={state}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default Train;
