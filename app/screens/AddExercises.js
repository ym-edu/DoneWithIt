import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextButton from '../components/TextButton';
import ExerciseList from '../components/ExerciseList';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function AddExercises({ navigation, route }) {
  const { db, workouts, parentExercises, increment } = useDB();
  const { workoutId, exerciseIndex } = route.params;

  const [selection, setSelection] = useState([]);

  const handleAdd = () => {
    const batch = db().batch();

    let currentIndex = exerciseIndex;

    let queries = selection.map(itemId => {
      return parentExercises.ref.where(db.FieldPath.documentId(), '==', itemId).get()
    });

    Promise.all(queries).then(querySnapshots => {
      return querySnapshots.map(snapshot => snapshot.docs)
      .reduce((accumulator, resultingDocs) => [...accumulator, ...resultingDocs])
    }).then((documents) => {
      documents.forEach(doc => {
        console.log("Item: ", doc.id, currentIndex)
        // console.log(currentIndex)
        
        const newRef = workouts.ref.doc(workoutId)
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
          weight: {
            current: "lb",
            kg: 0,
            lb: 0,
          },
          parentExercise_ref: doc.id,
          video: doc.data().video,
          position: currentIndex
        });

        batch.set(workouts.ref.doc(workoutId)
        .collection("childExercises").doc("_tally"), {
          childExercise_count: increment,
          childExercise_index: increment,
        }, { merge: true });

        currentIndex += 1;
      });
      batch.commit()
    })
  }
   
  return (
    <>
      <ExerciseList
      mode={'selectableList'}
      state={selection}
      setState={setSelection}
      />

      <View style={styles.footer}>
        <Spacer mV={2} style={styles.line}/>
        <View style={styles.buttons}>
            <TextButton onPress={() => {
              navigation.pop()
            }}>
              Cancel
            </TextButton>
            <TextButton
            onPress={() => {
              handleAdd()
              navigation.pop()
              navigation.pop()
            }}
            disabled={selection.length > 0 ? false : true}
            >
              Add
            </TextButton>
          </View>
        <Spacer mV={2}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#1D1E1E',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 8
  },
})

export default AddExercises;
