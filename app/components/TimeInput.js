import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

function TimeInput({mode, getValue, style}) {
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
          onChangeText={() => {
            null
          }}
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
          onChangeText={() => {
            null
            // mode === 'reps' ? handleRepsChange() : handleTimeChange()
          }}
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