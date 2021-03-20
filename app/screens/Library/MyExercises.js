import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function MyExercises() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exercises Stack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
})

export default MyExercises;
