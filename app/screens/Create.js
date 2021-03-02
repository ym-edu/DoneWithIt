import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TextButton } from '../components';

function Create() {
  const [exercise, setExercise] = useState(null);
  const [tempInput, setTempInput] = useState(null);

  const handlePress = () => {
    setExercise(tempInput);
  }

  return (
    <View style={styles.screen}>

      { exercise ? <Text>{exercise}</Text> :
      <>
        <TextInput label={'Title'} getValue={setTempInput}/>
        <TextButton onPress={handlePress}>Submit</TextButton>
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Create;
