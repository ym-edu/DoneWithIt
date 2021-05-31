import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

function Train({navigation, route}) {
  return (
    <>
      <View style={styles.container}>
        {/* <Button title={'log'} onPress={() => {console.log(route.params.exercises)}}/> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Train;