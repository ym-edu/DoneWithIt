import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { constants } from '../config'
const { lorem } = constants;

function Description({item}) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Focus Points</Text>
      <ScrollView>
        <Text style={styles.text}>Description for '{item.data.mode}' {item.title}</Text>
        <Text style={styles.lorem}>{lorem}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'cyan',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
    borderBottomWidth: 1,
    borderBottomColor: '#383B3B',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
  },  
  text: {
    color: 'white',
    marginBottom: 8,
  },
  lorem: {
    color: 'white',
    textAlign: 'justify',
  },
})

export default Description;