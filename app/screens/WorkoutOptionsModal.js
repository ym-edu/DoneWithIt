import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import TextButton from '../components/TextButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function WorkoutOptionsModal({navigation, route: { params: {exercises, workoutId, workoutName, exerciseIndex}}}) {
  const { db, workouts, decrement } = useDB();

  const [destroy, setDestroy] = useState(false);

  const handleDelete = () => {
    const batch = db().batch();

    batch.delete(workouts.ref.doc(workoutId));

    batch.update(workouts.ref.doc("_tally"), {
      workout_count: decrement,
    });

    batch.commit();
  }

  function OptionsBox() {
    return(
    <View style={styles.modal}>
      <TextButton
      style={styles.button}
      onPress={() => {
        navigation.navigate("AddExercises", {
          workoutId: workoutId,
          exerciseIndex: exerciseIndex,
        })
      }}>
        Add Exercises
      </TextButton>
      <TextButton onPress={() => navigation.navigate("SortChildExercises", {
        exercises: exercises,
        workoutId: workoutId,
      })} style={styles.button}>
        Sort Exercises
      </TextButton>
      <TextButton 
      style={styles.button}
      onPress={() => navigation.navigate("UpdateWorkout", {
        workoutId: workoutId,
        workoutName: workoutName,
      })}>
        Edit Workout
      </TextButton>
      <TextButton
      style={styles.button}
      onPress={() => {
        // navigation.pop()
        setDestroy(true)
      }}>
        Delete Workout
      </TextButton>
    </View>)
  }

  function ConfirmDeleteBox() {
    return(
      <View style={[styles.modal, {borderColor: '#D03050', padding: 16, width: '100%'}]}>
      <Text style={styles.title}>Delete workout</Text>
      <Spacer mV={8} />
      <Text style={[styles.title, {fontSize: 16, fontWeight: 'normal'}]}>
        Are you sure you want to delete this workout and all data associated with it?
      </Text>
      <Spacer mV={16} />
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <TextButton onPress={() => navigation.pop()}>
          Cancel
        </TextButton>
        <TextButton
        color={'#D03050'}
        onPress={() => {
          handleDelete()
          navigation.navigate("Library")
          navigation.popToTop()
        }}
        >
          Delete
        </TextButton>
      </View>
    </View>
  )
  }

  return (
    <>
      <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigation.pop()}
      >
        {destroy ? <ConfirmDeleteBox /> : <OptionsBox />}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modal: {
    // padding: 16,
    backgroundColor: '#242626',
    width: '75%',
    // borderRadius: 2,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
    position: 'absolute',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center'
  },
  button: {
    flex: 1,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
    padding: 2,
  }
})

export default WorkoutOptionsModal;
