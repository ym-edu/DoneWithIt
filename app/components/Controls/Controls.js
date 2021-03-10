import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './';

function Controls({
  session,
  exercise: {data, id},
  workoutBounds: { woStarting, woEnding },
  handlers: { handlePrev, handleNext, handleCount },
}) {
  function handlePause() {
    // console.log(session.isPaused)
    const self = {toggle: true}
    handleCount('isPaused', null, self)
    // console.log(session.isPaused)
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const display = {
    timeCount: session.timeLeft,
  }
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< DisplayData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ========================================================================
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETURN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========================================================================
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Previous onPress={handlePrev} woStarting={woStarting}/>

        <Counter mode={data.mode} display={display}
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
