import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Counter } from '../components';

import { constants } from '../config'
const { lorem } = constants;
import { exercises } from '../config'
const item = exercises[4]
const { data } = item

function Read() {
  const [currentId, setCurrentId] = useState(item.id);
  const nextEx = currentId + 1;

  return (
    <View style={styles.screen}>
      <View style={styles.video}>
        <Text style={{textTransform: 'capitalize'}}>{item.url}</Text>
      </View>

      <Counter data={data} id={item.id}/>

      <ScrollView style={styles.description}>
        <Text>Description for '{item.data.mode}' {item.title}</Text>
        <Text style={styles.lorem}>{lorem}</Text>
      </ScrollView>

      <View style={styles.nextItem}>
        <Text>Next Exercise: '{exercises[nextEx].data.mode}' {exercises[nextEx].title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  video: {
    backgroundColor: 'white',
    aspectRatio: 16/9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    backgroundColor: 'cyan',
    padding: 16,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16
  },
  lorem: {
    textAlign: 'justify'
  },
  nextItem: {
    backgroundColor: 'magenta',
    height: 96,
  }
})

export default Read;
