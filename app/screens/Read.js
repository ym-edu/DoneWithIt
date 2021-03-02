import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Read() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Read</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  }
})

export default Read;
