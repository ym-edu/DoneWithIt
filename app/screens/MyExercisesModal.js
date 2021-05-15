import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextButton from '../components/TextButton';
import ExerciseList from '../components/ExerciseList';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

import chunk from 'lodash.chunk';

function AddExercises({ navigation, route }) {
  const { db, workouts, parentExercises } = useDB();

  const currentWorkout = route.params.workoutId;
  const exerciseCount = route.params.count;

  const [selection, setSelection] = useState([]);

  const handleAdd = () => {
    const batch = db().batch();

    const chunks = chunk(selection, 10)

    chunks.forEach(chunk => {
      parentExercises.ref.where(db.FieldPath.documentId(), 'in', chunk).get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          // console.log(doc.id)

          const newRef = workouts.ref.doc(currentWorkout)
          .collection("childExercises").doc();

          batch.set(newRef, {
            exerciseName: doc.data().exerciseName,
            exerciseName_std: doc.data().exerciseName_std,
            mode: {
              current: "repsFixed",
              repsFixed: 8,
              repsTarget: 12,
              timeFixed: { min: 0, sec: 30 },
              timeTarget: { min: 1, sec: 30 }
            },
            parentExercise_ref: doc.id,
            video: doc.data().video,
          });
        });
        batch.commit().then(() => {
          console.log("WOW MUCH COMMIT")
        });
      })
    })


    // let currentIndex = exerciseCount
    // selection.forEach(item => {
    //   workouts.ref.doc(currentWorkout).collection("childExercies")
    //   .set({
    //     workouts: {
    //       [currentWorkout]: currentIndex,
    //     }
    //   }, { merge: true });


    //   firestore().collection("users").doc(userId).collection("workouts").doc(currentWorkout).update({
    //     exCount: increment,
    //   })

    //   currentIndex += 1;
    // })
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
              handleAdd()
              // navigation.pop()
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
