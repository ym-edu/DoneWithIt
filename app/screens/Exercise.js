import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

function Exercise({ store, dispatch }) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{store.items[store.index].exerciseName}</Text>

        <Button title={`TEST: 'next'`} onPress={() => {
          if(store.index < store.items.length - 1) {
            dispatch({ type: 'next' })
          }
        }}/>

        <Button title={`TEST: 'previous'`} onPress={() => {
          if(store.index > 0){
            dispatch({ type: 'previous' })
          }
        }}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  text: {
    color: 'white',
  }
})

export default Exercise;