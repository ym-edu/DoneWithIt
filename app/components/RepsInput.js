import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

function RepsInput() {
  const [value, setValue] = useState('');

  const handleChange = (input) => {
    const validatedInput = input.replace(/[^0-9]/g, '')
    setValue(validatedInput)
  }

  return (
    <>
      <View style={styles.col}>
        <TextInput
        style={styles.input}
        textAlign='center'
        keyboardType="numeric"
        maxLength={2}
        placeholder={'0'}
        placeholderTextColor='#C0C0B87F'
        onChangeText={(input) => {
          handleChange(input)
        }}
        value={value}
        />
        <Text style={styles.text}>reps</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 40,
    // backgroundColor: 'white',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 0
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: "700",
  },
  col: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
    // borderWidth: 1,
    // borderColor: 'red',
  },
})

export default RepsInput;