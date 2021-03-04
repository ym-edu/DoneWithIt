import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Counter } from '../components';

import { exercises } from '../config'
const item = exercises[0]
const { data } = item

function Read() {
  return (
    <View style={styles.screen}>
      <Counter data={data} id={item.id}/>
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
