import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextInput from '../components/TextInput';
import TextButton from '../components/TextButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function CreateWorkout({ navigation }) {
  const { db, workouts, increment } = useDB();

  const [input, setInput] = useState(null);

  const handleSubmit = (input) => {
    const newRef = workouts.ref.doc();
    const batch = db().batch(); //Must assign to new batch every function call, otherwise it is mistaken for the previously commited batch.

    batch.set(newRef, {
      workoutName: input,
      workoutName_std: input.toLowerCase(),
    });
    batch.set(workouts.tally, { workout_count: increment }, { merge: true })
    batch.commit().then(() => {
      navigation.pop()
    });
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.modal}>
          <Text style={styles.title}>New workout</Text>
          <Spacer mV={8} />
          <TextInput label={'Title'} focus={true} getValue={setInput} />
          <Spacer mV={16} />
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton onPress={() => handleSubmit(input)}>
              Create
            </TextButton>
          </View>
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

export default CreateWorkout;
