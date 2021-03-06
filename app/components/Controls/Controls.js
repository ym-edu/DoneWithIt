import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './';

function Controls({
  exercises,
  currentExercise: {data, id},
  bounds: { woStarting, woEnding },
  handlers: { handlePrev, handleNext },
}) {
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const allExercises = exercises;
  const [session, setSession] = useState([]);
  
  useEffect(() => {
    if(allExercises.length > 0) {
      const initialState = allExercises.map(exercise => exercise.isDisabled);
      setSession(initialState);
    }
  }, [allExercises])

  const handleChange = () => {
    const temp = [...session];
    temp[id-1] = !temp[id-1];
    setSession(temp);
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const repsSetReset = () => {
    console.log('repsSetReset')
  }
  const repsTargetReset = () => {
    console.log('repsTargetReset')
  }
  const timeSetReset = () => {
    console.log('timeSetReset')
  }
  const timeTargetReset = () => {
    console.log('timeTargetReset')
  }

  const selectResetHandler = (mode) => {
    switch(mode) {
      case 'r1':
        return repsSetReset;
      case 'r2':
        return repsTargetReset;
      case 't1':
        return timeSetReset;
      case 't2':
        return timeTargetReset;
    }
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RESET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< ProcessData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function formatTime(min, sec) {
    return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
  }

  const display = {
    reps: data.reps,
    time: formatTime(data.min,data.sec),
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< ProcessData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ========================================================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETURN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========================================================================
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Previous onPress={handlePrev} woStarting={woStarting}/>

        <Counter mode={data.mode} item={display} onPress={handleChange} />

        <Next onPress={handleNext} woEnding={woEnding}/>
      </View>

      <Reset onPress={selectResetHandler(data.mode)} exStarting={false}/>

      {/* Log data object */}
      <Reset onPress={() => console.log(`DATA ID: ${id} |`, data, session[id-1])} exStarting={false}/>
      {/* Log state array */}
      <Reset onPress={() => console.log(session)} exStarting={false}/>
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