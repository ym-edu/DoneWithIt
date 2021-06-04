import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const formatTime = (time) => {
  const formatedTime = moment.duration(time, "milliseconds").format("hh:mm:ss").padStart(4, "0:0");
  return formatedTime
}

function TimeTarget({ session: { end, count, isFinished, isPaused }, dispatch }) {
  useEffect(() => {
    if(isPaused) return;

    const interval = setInterval(() => {
      dispatch({ type: 'countUp' })
    }, 1000)
    
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if((count >= end) && !isFinished) {
      dispatch({ type: 'setFinished' }) //Set isFinished to true
    }
  }, [count])

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({ type: 'pause' })
      }}
      disabled={false}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{formatTime(count)}</Text>
        <Spacer style={styles.separator}/>
        <Text style={[styles.text, {color: '#C0C0B87F'}]}>{formatTime(end)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242626',
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  separator: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginHorizontal: 8,
    marginVertical: 4,
  },
})

export default TimeTarget
