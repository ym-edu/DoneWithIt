import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateButton from '../../components/CreateButton'
import Spacer from '../../components/Spacer';

function MyExercises() {
  return (
    <View style={styles.container}>
      <Spacer mV={16}
      style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
      <CreateButton icon={'plus'} title='create exercise'/>
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
