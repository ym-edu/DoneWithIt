import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function RepsFixed({ session: { end, count, isFinished }, dispatch }) {
  useEffect(() => {
    if((count === end) && !isFinished) {
      dispatch({ type: 'setFinished' }) //Set isFinished to true
    }
  }, [count])

  return (
    <TouchableOpacity
      onPress={() => {
        if(count > 0) {
          dispatch({ type: 'decrementCount' })
        }
      }}
      disabled={isFinished}
    >
      <View style={styles.container}>
          <Text style={styles.text}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242626',
    width: 48,
    height: 48,
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

export default RepsFixed