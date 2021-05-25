import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

function TimeInput({style, data, setModeState, current}) {
  const [values, setValues] = useState([data.min.toString(), data.sec.toString()])

  const handleChangeMin = (input) => {
    let val = input.replace(/[^0-9]/g, '')
    let sec = values[1]

    if(val >= 60) {
      val = '60';
      sec = '00'
    }

    setValues([val, sec])
  }

  const handleChangeSec = (input) => {
    let val = input.replace(/[^0-9]/g, '')
    let min = values[0] === '' ? 0 : parseInt(values[0])

    if(val > 59) {
      val = (val % 60); //converts val to int
      val < 10 ? val = `0${val}` : val
      min >= 60 ? '60' : min += 1; //min must be an int to increment
    }

    if(min >= 60) {
      val = '00'
    }

    setValues([min.toString(), val.toString()])
  }

  useEffect(() => {
    setModeState(prev => ({
      ...prev, [current]: {
        min: values[0] === '' ? 0 : parseInt(values[0], 10),
        sec: values[1] === '' ? 0 : parseInt(values[1], 10),
      }
    }))
  }, [values])

  return (
    <>
      <View style={[styles.col, {flexDirection: 'row', alignItems: 'space-around'}, style]}>
        <View style={{alignSelf:'center'}}>
          <TextInput
            style={styles.input}
            textAlign='center'
            keyboardType="numeric"
            maxLength={2}
            placeholder={'00'}
            placeholderTextColor='#C0C0B87F'
            clearTextOnFocus={true}
            onChangeText={(input) => {
              handleChangeMin(input)
            }}
            value={values[0]}
          />
          <Text style={styles.text}>min</Text>
        </View>

        <Text style={[styles.text, {bottom: 12, fontSize: 32}]}>:</Text>

        <View style={{alignSelf:'center'}}>
          <TextInput
            style={styles.input}
            textAlign='center'
            keyboardType="numeric"
            maxLength={2}
            placeholder={'00'}
            placeholderTextColor='#C0C0B87F'
            clearTextOnFocus={true}
            onChangeText={(input) => {
              handleChangeSec(input)
            }}
            value={values[1]}
          />
          <Text style={styles.text}>sec</Text>
        </View>
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

export default TimeInput;