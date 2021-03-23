import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useAuthUpdate } from '../hooks/useAuth'

function ExploreTab() {
  const { logOut } = useAuthUpdate();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Tab</Text>
      <Button title="Log Out" onPress={() => logOut()} />
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
    color: 'white'
  }
})

export default ExploreTab;
