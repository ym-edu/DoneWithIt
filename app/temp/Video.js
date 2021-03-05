import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

function Video({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    aspectRatio: 16/9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#C0C0B87F',
    textTransform: 'capitalize'
  },
})

export default Video;