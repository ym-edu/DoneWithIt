import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './';
import { formatTime, milToMin, milToSec } from '../../temp/utils';

function Controls({
  session,
  workout,
  // handleCount,
  // exercise: {data, id},
  // workoutBounds: { woStarting, woEnding },
  // handlers: { handlePrev, handleNext, handleCount },
}) {
  const [currentExercise, setCurrentExercise] = useState(workout[0]);
  const { id } = currentExercise;

  // const currentSession = session.current[id-1]
  
  const woStarting = id === 1;
  const woEnding = id === workout.length;
  // const workoutBounds = { woStarting, woEnding };
  
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
  
  // console.log(currentExercise.data.mode)
  
  
  
  
  
  
  const [clicked, setClicked] = useState(false)

  function handlePause() {
    // console.log(session.isPaused)

    const self = {toggle: true}
    handleCount('isPaused', null, self)
    console.log(session.current[id-1].isPaused)
    setClicked(!clicked)
  }



  const [display, setDisplay] = useState({
    timeCount: session.current[id-1].count,
    time: formatTime(currentExercise.data.min,currentExercise.data.sec)
  })
  // console.log((session.current[id-1].isPaused || currentExercise.data.mode != 't2'))

  useEffect(() => {
    setDisplay(session.current[id-1].count)

    console.log(session.current[id-1].isPaused)
    if(session.current[id-1].isPaused) return;
    console.log('in')
    const interval = setInterval(() => {
      // if(session.current[id-1].timeLeft === 0) return

      handleCount('timeLeft', -1000, { calc: true })

      const min = milToMin(session.current[id-1].timeLeft)
      const sec = milToSec(session.current[id-1].timeLeft)
      handleCount('count', formatTime(Math.abs(min), Math.abs(sec)), {})

      // console.log(session.current[id-1].count)
      setDisplay(session.current[id-1].count)
    }, 1000);
    return () => clearInterval(interval);
  },[clicked, id])
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const display = {
  //   timeCount: session.current[id-1].count,
  // }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ========================================================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETURN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========================================================================
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Previous onPress={handlePrev} woStarting={woStarting}/>

        <Counter mode={currentExercise.data.mode}
        // display={session.current[id-1].count}
        display={display}
        exFinished={false}
        onPress={() => null}/>

        <Next onPress={handleNext} woEnding={woEnding}/>
      </View>







      {/* handleReset */}
      {/* <Reset onPress={selector(data).reset} exStarting={starting}/> */}
      <Reset onPress={()=>handlePause()} exStarting={false}/>

      {/* Log data object */}
      {/* <Reset onPress={() => console.log('DATA ID:', id , '|', data, session[id-1])} exStarting={false}/> */}

      {/* Log state array */}
      <Reset onPress={() => console.log(session.current[id-1])} exStarting={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Controls;
