import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import TextInput from '../components/TextInput';
import TextButton from '../components/TextButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function UpdateWorkout({ navigation, route: { params: {workoutName, workoutId}}}) {
  const { workouts } = useDB();

  const [input, setInput] = useState(workoutName);

  const handleSubmit = (input) => {
    const workoutRef = workouts.ref.doc(workoutId);
    
    workoutRef.update({
      workoutName: input,
      workoutName_std: input.toLowerCase(),
    })
  }

  return (
    <>
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null} //Works for UpdateWorkout but not good for createExercise (hiding bottom submit bar)
    style={{flex: 1}}
    >

      <View style={styles.container}>

        <View style={styles.modal}>
          <Text style={styles.title}>Edit workout</Text>
          <Spacer mV={8} />
          <TextInput label={'Title'} focus={true} getValue={setInput} value={input} />
          <Spacer mV={16} />
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton
            onPress={() => {
              handleSubmit(input)
              navigation.navigate("Workout", {
                workoutName: input,
              })
            }}
            disabled={input.length > 0 && workoutName != input ? false : true}
            >
              Save
            </TextButton>
          </View>
        </View>

      </View>

    </KeyboardAvoidingView>
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
    padding: 16,
    backgroundColor: '#242626',
    width: '100%',
    borderRadius: 2,
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
})

export default UpdateWorkout;
