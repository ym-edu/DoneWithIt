import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateButton from '../components/CreateButton';
import Spacer from '../components/Spacer';
import ExerciseList from '../components/ExerciseList';

function Exercises({ navigation }) {
  return (
    <>
      <ExerciseList variant={'parentExercise'}/>
      <View style={styles.footer}>
        <Spacer mV={8}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <CreateButton icon={'plus'} title='create exercise' onPress={() => navigation.navigate("CreateExercise")}/>
        <Spacer mV={8}/>
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

export default Exercises;
