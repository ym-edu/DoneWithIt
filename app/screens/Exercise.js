import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import VideoLoop from '../components/VideoLoop'

function Exercise({ store: {index, items}, dispatch }) {
  function Buttons() {
    return(
      <>
        <Button title={`TEST: 'next'`} onPress={() => {
          if(index < items.length - 1) {
            dispatch({ type: 'next' })
          }
        }}/>

        <Button title={`TEST: 'previous'`} onPress={() => {
          if(index > 0){
            dispatch({ type: 'previous' })
          }
        }}/>

        <Button title={`log`} onPress={() => {
          console.log(items[index].video)
        }}/>
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <VideoLoop video={items[index].video}/>
        <Buttons/>
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