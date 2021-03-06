import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from '../temp'
import Controls from '../components/Controls/Controls';

import { workout } from '../config'

function Train() {
  workout.forEach(obj => obj.isDisabled = false);

  const [currentExercise, setCurrentExercise] = useState(workout[0]);

  const woStarting = currentExercise.id === 1;
  const woEnding = currentExercise.id === workout.length;
  const bounds = { woStarting, woEnding };

  const handlePrev = () => {
    const prevExercise = workout[currentExercise.id-2]
    setCurrentExercise(prevExercise)
  }
  const handleNext = () => {
    const nextExercise = workout[currentExercise.id]
    setCurrentExercise(nextExercise)
  }
  const handlers = { handlePrev, handleNext }

  return (
    <View style={styles.screen}>
      <Video item={currentExercise}/>

      <Controls
      exercises={workout}
      currentExercise={currentExercise}
      bounds={bounds}
      handlers={handlers}
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
