import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video, Description, Preview } from '../temp'
import Controls from '../components/Controls/Controls';

import { workout } from '../config'

function Train() {
  // const startingExercise = workout[0];
  // const endingExercise = workout[workout.length - 1];
  
  const currentExercise = workout[0]

  const { data } = currentExercise;
  const nextExercise = workout[currentExercise.id];

  function RenderPreview() {
    return (
      currentExercise.id >= workout.length ? null : <Preview item={nextExercise}/>)
  }

  return (
    <View style={styles.screen}>
      <Video item={currentExercise}/>
      <Controls data={data} id={currentExercise.id}/>
      <Description item={currentExercise}/>
      <RenderPreview/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default Train;
