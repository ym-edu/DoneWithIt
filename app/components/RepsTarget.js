import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';

function RepsTarget({ session: { end, count, isFinished }, dispatch }) {
  useEffect(() => {
    if((count >= end) && !isFinished) {
      dispatch({ type: 'setFinished' }) //Set isFinished to true
    }
  }, [count])

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({ type: 'incrementCount' })
      }}
      disabled={false}
    >
      <View style={styles.container}>
        <View style={styles.span}>
          <Text style={styles.text}>{count}</Text>
        </View>

        <Spacer style={styles.separator}/>

        <View style={styles.span}>
          <Text style={[styles.text, {color: '#C0C0B87F'}]}>{end}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242626',
    width: 96,
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  span: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  separator: {
    borderLeftColor: 'white',
    borderLeftWidth: StyleSheet.hairlineWidth,
    height: 24,
  },
})

export default RepsTarget
