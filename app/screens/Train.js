import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from '../temp'
import Controls from '../components/Controls/Controls';

import { workout } from '../config'

function Train() {
  workout.forEach(exercise => {
    function formatTime(min, sec) {
      return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
    }

    const {data} = exercise
    const {mode} = data
    let count

    switch(mode) {
      case 'r1':
        count = data.reps
        return exercise.session = {
          count: count,
          starting: true,
          finished: false,
        }
      case 'r2':
        count = 0
        return exercise.session = {
          count: count,
          starting: true,
          finished: false,
        }
      case 't1':
        count = formatTime(data.min, data.sec)
        return exercise.session = {
        count: count,
        starting: true,
        finished: false,
      }
      case 't2':
        count = formatTime(0, 0)
        return exercise.session = {
        count: count,
        starting: true,
        finished: false,
      }
    }
  });

  const [session, setSession] = useState([]);

  useEffect(() => {
    if(workout.length > 0) {
      const initialState = workout.map(exercise => exercise.session);
      setSession(initialState);
    }
  }, [workout])

  const [currentExercise, setCurrentExercise] = useState(workout[0]);

  const id = currentExercise.id;

  const woStarting = id === 1;
  const woEnding = id === workout.length;
  const bounds = { woStarting, woEnding };

  const handlePrev = () => {
    const prevExercise = workout[id-2]
    setCurrentExercise(prevExercise)
  }
  const handleNext = () => {
    const nextExercise = workout[id]
    setCurrentExercise(nextExercise)
  }
  function handleCount({key, value, self}) {
    const temp = [...session];
    temp[id-1][key] = self ? temp[id-1][key] + value : value;
    setSession(temp);
  }
  const handlers = { handlePrev, handleNext, handleCount }

  return (
    <View style={styles.screen}>
      <Video item={currentExercise}/>

      <Controls
      session={session}
      // exercises={workout}
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
