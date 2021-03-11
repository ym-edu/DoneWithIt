import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from '../../temp/Video' //VIDEO
import { Previous, Next, Reset, Counter } from './';
import { formatTime, milToMin, milToSec, getMil, initializeTime } from '../../temp/utils';

function Controls({state, workout, currentExercise}) {
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const [exercise, setExercise] = useState(workout[0]);
const { id } = exercise;

  const session = state.current[id-1]
  
  const woStarting = id === 1;
  const woEnding = id === workout.length;
  
  const handlePrev = () => {
    const prev = workout[id-2]
    setExercise(prev)
  }
  const handleNext = () => {
    const next = workout[id]
    setExercise(next)
  }
  function handleCount(key, value, {calc, toggle}) {
    const temp = [...state.current];
    if(calc || toggle) {
      const self = temp[id-1][key]
      temp[id-1][key] = calc ? self + value : !self
      return state.current = temp
    }
    temp[id-1][key] = value
    return state.current = temp
  }
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [clicked, setClicked] = useState(false)

  function handleCount2(obj) {
    const temp = [...state.current];
    const target = temp[id-1]
    const source = obj
    const returnedTarget = Object.assign(target, source)
    console.log(returnedTarget.time)
    setClicked(!clicked)
  }
  
  function handlePress() {
    handleCount('isPaused', null, {toggle: true})
    setClicked(!clicked)
  }

  const [count, setCount] = useState(session.count)
  const target = formatTime(exercise.data.min,exercise.data.sec)

  useEffect(() => {
    setCount(session.count)
    const mil = getMil(exercise.data.min, exercise.data.sec)

    if(session.isPaused) return;
    const interval = setInterval(() => {
      if(session.time === 0 && exercise.data.mode === 't1') return
      else if(session.time === mil && exercise.data.mode === 't2') return

      const value = exercise.data.mode === 't1' ? -1000 : 1000
      handleCount('time', value, { calc: true })

      const min = milToMin(session.time)
      const sec = milToSec(session.time)
      handleCount('count', formatTime(Math.abs(min), Math.abs(sec)), {})

      setCount(session.count)
    }, 1000);
    return () => clearInterval(interval);
  },[clicked, id])
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function handleReset() {
    const reset = initializeTime(exercise)
    handleCount2(reset)
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// ========================================================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETURN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========================================================================
  return (
    <View style={styles.container}>
      <Video item={exercise}/>
      {/* //VIDEO */}

      <View style={styles.controls}>
        <Previous onPress={handlePrev} woStarting={woStarting}/>

        <Counter mode={exercise.data.mode}
        display={{timeCount: count, time: target}}
        exFinished={false}
        onPress={()=>handlePress()}/>

        <Next onPress={handleNext} woEnding={woEnding}/>
      </View>
{/* ---------------------------------------------------------------------- */}
      {/* handleReset */}
      <Reset onPress={()=> handleReset()} exStarting={false}/>

      {/* Log data object */}
      <Reset onPress={() => console.log(session)} exStarting={false}/>

      {/* Log state array */}
      <Reset onPress={() => console.log(state)} exStarting={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 16, //VIDEO
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16, //VIDEO
  }
})

export default Controls;
