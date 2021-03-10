import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from '../temp'
import Controls from '../components/Controls/Controls';
import { formatTime, minToMil, secToMil } from '../temp/utils/'

import { workout } from '../config'

function Train() {
  workout.forEach(exercise => {
    const { data:{min, sec} } = exercise
    const mil = minToMil(min) + secToMil(sec)
    exercise.session = {
      isStarting: true,
      isFinished: false,
      isPaused: false,
      timeLeft: mil,
      count: formatTime(min, sec),
    }
  })

  const session = useRef([])

  if (workout.length > 0) {
    const initialState = workout.map(exercise => exercise.session);
    session.current = initialState
  }
  
  // const [currentExercise, setCurrentExercise] = useState(workout[0]);
  // const { id } = currentExercise;

  // const currentSession = session.current[id-1]

  // const woStarting = id === 1;
  // const woEnding = id === workout.length;
  // const workoutBounds = { woStarting, woEnding };

  // const handlePrev = () => {
  //   const prevExercise = workout[id-2]
  //   setCurrentExercise(prevExercise)
  // }
  // const handleNext = () => {
  //   const nextExercise = workout[id]
  //   setCurrentExercise(nextExercise)
  // }
  // function handleCount(key, value, {calc, toggle}) {
  //   const temp = [...session.current];
  //   if(calc || toggle) {
  //     const self = temp[id-1][key]
  //     temp[id-1][key] = calc ? self + value : !self
  //     return session.current = temp
  //   }
  //   temp[id-1][key] = value
  //   return session.current = temp
  // }
  // const handlers = { handlePrev, handleNext, handleCount }

  return (
    <View style={styles.screen}>
      {/* <Video item={currentExercise}/> */}

      <Controls
      workout={workout}
      session={session}
      // handleCount={handleCount}
      // exercise={currentExercise}
      // workoutBounds={workoutBounds}
      // handlers={handlers}
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
