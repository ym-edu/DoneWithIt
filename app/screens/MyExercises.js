import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateButton from '../components/CreateButton'
import Spacer from '../components/Spacer';

function MyExercises({ navigation }) {
  return (
    <View style={styles.container}>
      <Spacer mV={16}
      style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
      <CreateButton icon={'plus'} title='create exercise' onPress={() => navigation.navigate("Modal")}/>
      <Spacer mV={16}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white'
  }
})

export default MyExercises;
