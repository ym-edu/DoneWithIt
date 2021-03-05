import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './'

function Controls({data, id}) {
  function formatTime(min, sec) {
    return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
  }

  // ===== proccessedData =====
  const display = {
    reps: data.reps,
    time: formatTime(data.min,data.sec),
  }
  // ===== proccessedData =====

  const onPress = (component) => {
    console.log(`${component} Pressed |`, `DATA ID: ${id} |`, data)
  }
// #################################
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Previous
        onPress={() => onPress('Previous')} woStarting={false}/>

        <Counter mode={data.mode} item={display} onPress={() => onPress('Counter')} />

        <Next
        onPress={() => onPress('Next')} woEnding={false}/>
      </View>

      <Reset
      onPress={() => onPress('Reset')} exStarting={false}/>
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