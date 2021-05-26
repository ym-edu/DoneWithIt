import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import TextButton from '../components/TextButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';
import Grid from '../components/Grid';

function ChildExerciseUpdate({ navigation, route: {params: {exercise, workoutId}}}) {
  const { db, workouts, increment } = useDB();
  const [weightState, setWeightState] = useState({});
  const [modeState, setModeState] = useState({});

  const handleUpdate = () => {
    // console.log(weightState)
    // console.log(modeState)

    workouts.ref.doc(workoutId).collection("childExercises").doc(exercise.id)
    .update({
      "mode.current": modeState.current,
      "mode.repsFixed": modeState.repsFixed,
      "mode.repsTarget": modeState.repsTarget,
      "mode.timeFixed.min": modeState.timeFixed.min,
      "mode.timeFixed.sec": modeState.timeFixed.sec,
      "mode.timeTarget.min": modeState.timeTarget.min,
      "mode.timeTarget.sec": modeState.timeTarget.sec,
      "weight.current": weightState.current,
      "weight.kg": "kg" in weightState ? weightState.kg : exercise.weight.kg,
      "weight.lb": "lb" in weightState ? weightState.lb : exercise.weight.lb,
    }).then(() => console.log('done'))
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
            <Grid
              data={exercise}
              setWeightState={setWeightState}
              setModeState={setModeState}
            />
          {/* <Spacer mV={16} /> */}
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton
            onPress={() => {
              handleUpdate()
              navigation.pop()
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
