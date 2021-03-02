import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Counter } from '../components';
import { data } from '../config'
const item = data.exercises[0];

function Read() {
  return (
    <View style={styles.screen}>
      <Counter data={item}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Read;
