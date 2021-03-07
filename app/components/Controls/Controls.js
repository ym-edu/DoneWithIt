import React from 'react';
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

    timeTarget.count = session[id-1].count
    timeTarget.exStarting = session[id-1].starting
    timeTarget.exFinished = session[id-1].finished

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
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  repsSet.reset = function() {
    let key
    let value
    let self
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
  repsTarget.reset = function() {
    console.log('repsTargetReset')
  }
  timeSet.reset = function() {
    console.log('timeSetReset')
  }
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
    timeCount: selector(data).count,
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  console.log(data.reps)
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
      <Reset onPress={selector(data).reset} exStarting={starting}/>

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
