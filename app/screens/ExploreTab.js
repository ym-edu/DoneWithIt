import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useAuthUpdate } from '../hooks/useAuth'
import auth from '@react-native-firebase/auth';

function ExploreTab() {
  const { logOut } = useAuthUpdate();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Tab</Text>
      <Button title="Log Out" onPress={() => logOut()} />
      <Button title="delete user" onPress={() => auth().currentUser.delete()} />
      <Button title="current user" onPress={() => console.log(auth().currentUser.uid)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  }
})

export default ExploreTab;
