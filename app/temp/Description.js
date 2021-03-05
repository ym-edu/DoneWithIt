import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native'
import { constants } from '../config'
const { lorem } = constants;

function Description({item}) {
  return (
    <ScrollView style={styles.container}>
      <Text style={{marginBottom:8}}>Description for '{item.data.mode}' {item.title}</Text>
      <Text style={styles.lorem}>{lorem}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'cyan',
    padding: 16,
  },
  lorem: {
    textAlign: 'justify',
    marginBottom: 32, // twice container padding
  },
})

export default Description;