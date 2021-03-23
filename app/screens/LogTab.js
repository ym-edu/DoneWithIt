import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function LogTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log Tab</Text>
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

export default LogTab;
