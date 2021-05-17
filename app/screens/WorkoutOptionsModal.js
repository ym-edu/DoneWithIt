import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextButton from '../components/TextButton';

function WorkoutOptionsModal({ navigation, route: { params: { exercises } } }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.modal}>
          <TextButton onPress={() => navigation.navigate("SortChildExercises", {
            exercises: exercises
          })} style={styles.button}>
            Sort Exercises
          </TextButton>
          <TextButton onPress={() => console.log(exercises)} style={styles.button}>
            Edit Workout Name
          </TextButton>
          <TextButton onPress={() => navigation.pop()} style={styles.button}>
            Delete Workout
          </TextButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
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
  },
  button: {
    flex: 1,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
    padding: 2
  }
})

export default WorkoutOptionsModal;
