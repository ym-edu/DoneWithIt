import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextInput from '../components/TextInput'
import TextButton from '../components/TextButton'
import firestore from '@react-native-firebase/firestore'

function CreateWorkout({ navigation }) {
  const userId = 'user-1';
  const [input, setInput] = useState(null)

  const handleSubmit = (title) => {
    const countWorkouts = async () => {
      const increment = firestore.FieldValue.increment(1)
      await firestore().collection("users").doc(userId).update({
        workoutCount: increment,
      });
    }

    firestore().collection("users").doc(userId).collection("workouts").add({
      woName: title,
      woCount: 0,
    }).then(ref => {
      // console.log("Added doc with ID:", ref.id)
      countWorkouts()
      navigation.pop()
    })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>New workout</Text>
          <TextInput label={'Title'} focus={true} getValue={setInput}/>
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
    alignItems: 'center',
    padding: 32,
  },
  modal: {
    flex: 1/4,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#242626',
    width: '100%',
    borderRadius: 2,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    color: 'white',
    fontSize: 16,
  }
})

export default CreateWorkout;
