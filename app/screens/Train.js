import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from '../temp'
import Controls from '../components/Controls/Controls';
import { formatTime } from '../temp/utils/'

import { workout } from '../config'

function Train() {
  workout.forEach(exercise => {
    const { data } = exercise

    exercise.session = {
      id: exercise.id,
      isStarting: true,
      isFinished: false,
      isPaused: false,
      timeLeft: formatTime(data.min, data.sec),
    }
  })

  const session = useRef([])

  if (workout.length > 0) {
    const initialState = workout.map(exercise => exercise.session);
    session.current = initialState
  }
  
  const [currentExercise, setCurrentExercise] = useState(workout[0]);
  const { id } = currentExercise;

  const currentSession = session.current[id-1]

  const woStarting = id === 1;
  const woEnding = id === workout.length;
  const workoutBounds = { woStarting, woEnding };

  const handlePrev = () => {
    const prevExercise = workout[id-2]
    setCurrentExercise(prevExercise)
  }
  const handleNext = () => {
    const nextExercise = workout[id]
    setCurrentExercise(nextExercise)
  }
  function handleCount(key, value, {calc, toggle}) {
    const temp = [...session.current];
    if(calc || toggle) {
      const self = temp[id-1][key]
      temp[id-1][key] = calc ? self + value : !self
      return session.current = temp
    }
    temp[id-1][key] = value
    return session.current = temp
  }
  const handlers = { handlePrev, handleNext, handleCount }

  return (
    <View style={styles.screen}>
      <Video item={currentExercise}/>

      <Controls
      session={currentSession}
      exercise={currentExercise}
      workoutBounds={workoutBounds}
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
