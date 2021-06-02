import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function RepsSet({ session: { count }, dispatch }) {
  const isFinished = count === 0

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

export default RepsSet