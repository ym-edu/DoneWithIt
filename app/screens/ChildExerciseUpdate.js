import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import TextButton from '../components/TextButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';
import Grid from '../components/Grid';

function ChildExerciseUpdate({ navigation, route: {params: {exercise}}}) {
  const { db, workouts, increment } = useDB();
  const [weightState, setWeightState] = useState({});

  const handleUpdate = () => {
    console.log(weightState)
  }

  return (
    <>
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null} //Works for createWorkout but not good for createExercise (hiding bottom submit bar)
    style={{flex: 1}}
    >

      <View style={styles.container}>

        <View style={styles.modal}>
          <Text style={styles.title}>Set your goals</Text>
          <Spacer mV={8} />
            <Grid data={exercise} setWeightState={setWeightState}/>
          {/* <Spacer mV={16} /> */}
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton
            onPress={() => {
              handleUpdate()
              // navigation.pop()
            }}
            disabled={false}
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
    paddingHorizontal: 16,
  },
  modal: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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

export default ChildExerciseUpdate;
