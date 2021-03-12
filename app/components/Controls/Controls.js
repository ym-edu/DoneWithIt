import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from '../../temp/Video' //VIDEO
import { Previous, Next, Reset, Counter } from './';
import { formatTime, milToMin, milToSec, getMil, initializeTime, initializeReps } from './utils';

function Controls({state, workout}) {
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [exercise, setExercise] = useState(workout[0]);
  const { id, data:{mode, reps, min, sec} } = exercise;
  
  const [clicked, setClicked] = useState(false)
  
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
  
  function handleTimeCount(key, value, {calc, toggle}) {
    const temp = [...state.current];
    if(calc || toggle) {
      const self = temp[id-1][key]
      temp[id-1][key] = calc ? self + value : !self
      return state.current = temp
    }
    temp[id-1][key] = value
    return state.current = temp
  }
  function handleRepsCount() {
    const temp = [...state.current];
    
    if(session.count <= reps && mode === 'r1'){
      temp[id-1].isStarting = false
    }
    
    if(session.count <= 1 && mode === 'r1') {
      temp[id-1].isFinished = true
      if(session.count === 0) return
    }
    
    if(session.count >= 0 && mode === 'r2') {
      temp[id-1].isStarting = false
    }
    
    if(session.count >= reps-1 && mode === 'r2') {
      temp[id-1].isFinished = true
    }
    
    const self = temp[id-1].count;
    temp[id-1].count = mode === 'r1' ? self - 1 : self + 1;
    
    setClicked(!clicked)
  }
  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TIME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [count, setCount] = useState(session.count)
  const target = formatTime(min, sec)

  function handlePause() {
    handleTimeCount('isPaused', null, {toggle: true})
    setClicked(!clicked)
  }
  
  useEffect(() => {
    setCount(session.count)
    
    if(!(mode != 't1' || mode != 't2')) return
    
    const mil = getMil(min, sec)

    if((mode === 'r1' || mode === 'r2')) return
    
    if(session.isPaused) return;

    const interval = setInterval(() => {
      if(session.time <= 1000 && mode === 't1') {
        handleTimeCount('isFinished', true, {})
        if(session.time <= 0 && mode === 't1') return
      }
      if(session.time <= mil && mode === 't1') {
        handleTimeCount('isStarting', false, {})
      }

      if(session.time >= mil-1000 && mode === 't2') {
        handleTimeCount('isFinished', true, {})
      }
      if(session.time <= mil && mode === 't2') {
        handleTimeCount('isStarting', false, {})
      }

      const value = mode === 't1' ? -1000 : 1000
      handleTimeCount('time', value, { calc: true })

      const min = milToMin(session.time)
      const sec = milToSec(session.time)
      handleTimeCount('count', formatTime(Math.abs(min), Math.abs(sec)), {})

      setCount(session.count)
    }, 1000);
    
    return () => clearInterval(interval);
  },[clicked, id])
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TIME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  //  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function handleRepsReset() {
  const reset = initializeReps(exercise)

  const temp = [...state.current];
  Object.assign(temp[id-1], reset)
  setClicked(!clicked)
}
  function handleTimeReset() {
    const reset = initializeTime(exercise)

    const temp = [...state.current];
    Object.assign(temp[id-1], reset)
    setClicked(!clicked)
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const display = {timeCount: count, time: target, repsCount: count, reps: reps}

// ========================================================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETURN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========================================================================
  return (
    <View style={styles.container}>
      <Video item={exercise}/>
      {/* //VIDEO */}

      <View style={styles.controls}>
        <Previous onPress={handlePrev} woStarting={woStarting}/>

        <Counter mode={mode}
        display={display}
        exFinished={mode === 'r1' ? session.isFinished : null}
        onPress={() => {
          (mode === 't1' || mode === 't2') ? handlePause() : handleRepsCount()
        }}/>

        <Next onPress={handleNext} woEnding={woEnding}/>
      </View>
{/* ---------------------------------------------------------------------- */}
      {/* handleTimeReset */}
      <Reset onPress={() => {
        (mode === 't1' || mode === 't2') ? handleTimeReset() : handleRepsReset()
      }} exStarting={(mode === 'r1' || mode === 'r2') ? session.isStarting : null}/>

      {/* Log data object */}
      {/* <Reset onPress={() => console.log(session)} exStarting={false}/> */}

      {/* Log state array */}
      {/* <Reset onPress={() => console.log(state)} exStarting={false}/> */}
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
