import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

function WorkoutComplete({route: {params: {items}}}) {
  return (
    <>
      <View style={styles.container}>
        <Button title={'log'} onPress={() => {
          console.log(items)
        }}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default WorkoutComplete;