import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video, Description, Preview } from '../temp'
import Controls from '../components/Controls/Controls';

import { workout } from '../config'

function Train() {
  workout.forEach(obj => obj.isDisabled = false)
  // const startingExercise = workout[0];
  // const endingExercise = workout[workout.length - 1];

// start
  const currentExercise = workout[9]

//   // const { data } = currentExercise;
//   // const nextExercise = allExercises[currentExercise.id];

//   // function RenderPreview() {
//   //   return (
//   //     currentExercise.id >= allExercises.length ? null : <Preview item={nextExercise}/>)
//   // }
// end

  return (
    <View style={styles.screen}>
      <Video item={currentExercise}/>
      <Controls exercises={workout} currentExercise={currentExercise}/>
      {/* <Description item={currentExercise}/>
      <RenderPreview/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default Train;
