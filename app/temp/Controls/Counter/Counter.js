import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RepsSet, RepsTarget, TimeSet, TimeTarget } from '.';

export function Counter({
  display: { reps, repsCount, time, timeCount },
  mode,
  exFinished,
  onPress,
  }) {
  function Select() {
    switch(mode) {
      case 'r1':
        return <RepsSet count={repsCount}/>;
      case 'r2':
        return <RepsTarget count={repsCount} reps={reps}/>;
      case 't1':
        return <TimeSet count={timeCount}/>;
      case 't2':
        return <TimeTarget count={timeCount} time={time}/>;
    }
  }

  return (
    <TouchableOpacity style={styles.container}
    onPress={onPress}
    disabled={exFinished}>
      <Select />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
})

export default Counter