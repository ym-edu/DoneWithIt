import React, {useEffect, useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './';

function Controls({
  session,
  currentExercise: {data, id},
  bounds: { woStarting, woEnding },
  handlers: { handlePrev, handleNext, handleCount },
}) {
function formatTime(min, sec) {
  return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const repsSet={}
  const repsTarget={}
  const timeSet={}
  const timeTarget={}
  let finished
  let starting

  if(session.length > 0) {
    repsSet.count = session[id-1].count
    repsSet.exStarting = session[id-1].starting
    repsSet.exFinished = session[id-1].finished
    
    repsTarget.count = session[id-1].count
    repsTarget.exStarting = session[id-1].starting
    repsTarget.exFinished = session[id-1].finished

    timeSet.count = session[id-1].count
    timeSet.exStarting = session[id-1].starting
    timeSet.exFinished = session[id-1].finished
    timeSet.min = session[id-1].min
    timeSet.sec = session[id-1].sec
    timeSet.mil = session[id-1].mil
    timeSet.timeLeft = session[id-1].timeLeft

    timeTarget.count = session[id-1].count
    timeTarget.exStarting = session[id-1].starting
    timeTarget.exFinished = session[id-1].finished
    timeTarget.min = session[id-1].min
    timeTarget.sec = session[id-1].sec

    finished = session[id-1].finished
    starting = session[id-1].starting
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  repsSet.handlePress = function() {
    let key
    let value
    let self
    let params

    if(repsSet.count === 1) {
      key = 'finished'
      value = true
      params = {key, value}
      handleCount(params)
    }

    if(repsSet.count >= 1) {
      key = 'count'
      value = -1
      self = true
      params = {key, value, self}
      handleCount(params)
    }

    if(repsSet.count <= data.reps) {
      key = 'starting'
      value = false
      params = {key, value}
      handleCount(params)
    }
  }
// #######################################################################
  repsTarget.handlePress = function() {
    let key
    let value
    let self
    let params

    if(repsTarget.count === data.reps -1) {
      key = 'finished'
      value = true
      params = {key, value}
      handleCount(params)
    }

    if(repsTarget.count <= data.reps) {
      key = 'count'
      value = 1
      self = true
      params = {key, value, self}
      handleCount(params)
    }

    if(repsTarget.count >= 0) {
      key = 'starting'
      value = false
      params = {key, value}
      handleCount(params)
    }
  }
  // #######################################################################



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  repsSet.reset = function() {
    let key
    let value
    let params

    function resetStarting() {
      key = 'starting'
      value = true
      params = {key, value}
      handleCount(params)
    }
    function resetFinished() {
      key = 'finished'
      value = false
      params = {key, value}
      handleCount(params)
    }
    function resetCount() {
      key = 'count'
      value = data.reps
      params = {key, value}
      handleCount(params)
    }
    resetStarting()
    resetFinished()
    resetCount()
  }
// #######################################################################
  repsTarget.reset = function() {
    let key
    let value
    let params

    function resetStarting() {
      key = 'starting'
      value = true
      params = {key, value}
      handleCount(params)
    }

    function resetFinished() {
      key = 'finished'
      value = false
      params = {key, value}
      handleCount(params)
    }

    function resetCount() {
      key = 'count'
      value = 0
      params = {key, value}
      handleCount(params)
    }
    resetStarting()
    resetFinished()
    resetCount()
  }
  timeSet.reset = function() {
    function count() {
      let key = 'timeLeft'
      let value = - 1000
      let self = true
      let params = {key, value, self}
      handleCount(params)
    }
    return count()
  }

  if(data.mode === 't1') {
    }

    // const interval = setInterval(log, 1000)
    const isPaused = false

    useEffect(() => {
      if((isPaused || data.mode != 't1')) return;
      const interval = setInterval(() => {
        // console.log('counting...'); // CODE HERE
          let key = 'timeLeft'
          let value = - 1000
          let self = true
          let params = {key, value, self}
          handleCount(params)
      }, 1000);
      return () => clearInterval(interval);
    },[id])


    const handleDisplay = (param) => {
      const display = {
        // reps: data.reps,
        // repsCount: selector(data).count,
        time: formatTime(data.min,data.sec),
        timeCount: param,
      }
      return display
    }

    const timeTime = useRef()

    useEffect(() => {
      console.log(timeSet.timeLeft)
      handleDisplay(timeSet.timeLeft)
      timeTime.current = timeSet.timeLeft
    },[timeSet.timeLeft])

  timeTarget.reset = function() {
    console.log('timeTargetReset')
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  const selector = ({mode}) => {
    switch(mode) {
      case 'r1':
        return repsSet;
      case 'r2':
        return repsTarget;
      case 't1':
        return timeSet;
      case 't2':
        return timeTarget;
    }
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const display = {
    reps: data.reps,
    repsCount: selector(data).count,
    time: formatTime(data.min,data.sec),
    // timeCount: selector(data).count,
    timeCount: timeTime.current
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // console.log()
// ========================================================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETURN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========================================================================
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Previous onPress={handlePrev} woStarting={woStarting}/>

        <Counter mode={data.mode} display={display}
        exFinished={finished}
        onPress={() => selector(data).handlePress()}/>

        <Next onPress={handleNext} woEnding={woEnding}/>
      </View>







      {/* handleReset */}
      {/* <Reset onPress={selector(data).reset} exStarting={starting}/> */}
      <Reset onPress={selector(data).reset} exStarting={false}/>

      {/* Log data object */}
      <Reset onPress={() => console.log(`DATA ID: ${id} |`, data, session[id-1])} exStarting={false}/>

      {/* Log state array */}
      <Reset
      onPress={() => console.log(session)} exStarting={false}/>
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
