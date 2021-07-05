import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function WeightInput({style, data, setWeightState, reset}) {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    // console.log(data[data.current])
    //Set unit array with index 0 as the default unit from exercise data.current
    data.current === 'kg' ? setUnit(['kg', 'lb']) : setUnit(['lb', 'kg'])
    //Set default value from data by using key (kg||lb), defined by unit state
    setValue(data[data.current].toString())
  }, [reset])

  const handleChange = (input) => {
    const validatedInput = input.replace(/[^0-9]/g, '')
    setValue(validatedInput)
  }

  useEffect(() => {
    const weight = {
      ["current"]: unit[0],
      [unit[0]]: value === '' ? 0 : parseInt(value, 10)
    }

    setWeightState(weight)
  }, [value])

  function ToggleButton() {
    return (
      <TouchableOpacity style={styles.toggleButton} onPress={() => {
        //Because index 0 of unit state is our primary key, we can swap unit values unit[0] <-> unit[1] on toggle to change keys (kg || lb)
        setUnit([unit[0], unit[1]] = [unit[1], unit[0]])
        //Then we use the current key to set input value to the one defined in data for that key.
        setValue(data[unit[0]].toString())

        //Update weightState (current & corresponding value from data) on toggle
        const weight = { ["current"]: unit[0], [unit[0]]: data[unit[0]] }
        
        setWeightState(weight)
      }}>
        <Text style={styles.text}>{unit[0]}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <>
      <View style={[styles.col, style]}>
        <TextInput
        style={styles.input}
        textAlign='center'
        keyboardType="numeric"
        maxLength={4}
        placeholder={'0'}
        placeholderTextColor='#C0C0B87F'
        onChangeText={(input) => {
          handleChange(input)
        }}
        value={value} //IMPORTANT: All input values must be strings
        />
        <ToggleButton/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 80,
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
    paddingHorizontal: 8,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  toggleButton: {
    alignSelf: 'center',
    width: '50%',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#C0C0B87F',
  }
})

export default WeightInput;