import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CreateButton from '../components/CreateButton'
import Spacer from '../components/Spacer';

function Workout({ navigation, route }) {
  const routeData = route.params.id
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{routeData}</Text>
      <Spacer mV={16}
      style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
      <CreateButton icon={'plus'} title='add exercises' onPress={() => navigation.navigate("Modal")}/>
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

export default Workout;
