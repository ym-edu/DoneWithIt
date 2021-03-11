import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Controls from '../components/Controls/Controls';

import { workout } from '../config'
import initialize from '../temp/utils/initializeTime';

function Train() {
  workout.forEach(exercise => {
    return initialize(exercise);
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
