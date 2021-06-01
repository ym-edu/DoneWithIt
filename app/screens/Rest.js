import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

function Rest({ store, dispatch }) {
  return (
    <>
      <View style={styles.container}>
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
    backgroundColor: 'red',
  },
})

export default Rest;