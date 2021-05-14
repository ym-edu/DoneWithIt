import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextButton from '../components/TextButton';
import ExerciseList from '../components/ExerciseList';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function AddExercises({ navigation, route }) {
  const { workouts } = useDB();
  const exArray = route.params.list;
  const currentWorkout = route.params.workoutId;
  const exerciseCount = route.params.count
  const { invokedBy } = route.params
  const [selection, setSelection] = useState([]);

  const handleAdd = () => {
    const newRef = workouts.ref.doc(currentWorkout)
    .collection("childExercises").doc();
    const batch = db().batch();

    batch.set(newRef, {
      children_count: 0,
      exerciseName: exerciseName,
      exerciseName_std: exerciseName.toLowerCase(),
      video: {
        endTimeSec: values[1],
        startTimeSec: values[0],
        url: videoId
      },
    });

    let currentIndex = exerciseCount
    selection.forEach(item => {
      workouts.ref.doc(currentWorkout).collection("childExercies")
      .set({
        workouts: {
          [currentWorkout]: currentIndex,
        }
      }, { merge: true });


      firestore().collection("users").doc(userId).collection("workouts").doc(currentWorkout).update({
        exCount: increment,
      })

      currentIndex += 1;
    })

  }

  return (
    <>
      <ExerciseList
      mode={'selectableList'}
      state={selection}
      onPress={setSelection}
      />

      <View style={styles.footer}>
        <Spacer mV={16}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 32}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton onPress={() => {
              // handleAdd()
              // navigation.pop()
              // console.log(selection, exerciseCount)
              console.log(invokedBy)
            }}>
              Add
            </TextButton>
          </View>
        <Spacer mV={16}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

export default AddExercises;
