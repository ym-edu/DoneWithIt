import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const formatTime = (time) => {
  const formatedTime = moment.duration(time, "milliseconds").format("hh:mm:ss").padStart(4, "0:0");
  return formatedTime
}

function TimeFixed({ session: { end, count, isFinished, isPaused }, dispatch }) {
  useEffect(() => {
    if(isFinished || isPaused) return;

    const interval = setInterval(() => {
      dispatch({ type: 'countDown' })
    }, 1000)
    
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if((count === end) && !isFinished) {
      dispatch({ type: 'setFinished' }) //Set isFinished to true
    }
  }, [count])

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({ type: 'pause' })
      }}
      disabled={isFinished}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{formatTime(count)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242626',
    width: 80,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
})

export default TimeFixed
