import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import VideoLoop from '../components/VideoLoop'
import { useIcon } from '../layout'

function Exercise({ store: {index, items}, dispatch }) {
  const Icon = useIcon();
  const currentExercise = items[index];
  const isFirstExercise = index === 0;
  const isLastExercise = index === items.length - 1;

  function Controls() {
    return(
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            if(index > 0){
              dispatch({ type: 'previous' })
            }
          }}
          disabled={isFirstExercise}>
          <Icon name='angle' size={32} color={isFirstExercise ? '#383B3B' : 'white'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{transform: [{rotateY: '180deg'}]}}
          onPress={() => {
            if(index < items.length - 1) {
              dispatch({ type: 'next' })
            }
          }}
          disabled={isLastExercise}>
          <Icon name='angle' size={32} color={isLastExercise ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <VideoLoop video={currentExercise.video}/>
        <Controls/>
        <Button title={`log`} onPress={() => {
          console.log(currentExercise.video)
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  }
})

export default Exercise;