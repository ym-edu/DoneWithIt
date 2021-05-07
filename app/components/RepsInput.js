import React, { useRef, useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useLoopUpdate } from '../hooks/useLoop';

function RepsInput() {
  const [value, setValue] = useState('');
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const { setKeyboardVisible } = useLoopUpdate();


  const handleChange = (input) => {
    const validatedInput = input.replace(/[^0-9]/g, '')
    setValue(validatedInput)
  }

  const handlePress = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        inputRef.current.blur()
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [])

  return (
    <>
      <View style={styles.col}>
        <TextInput
        style={styles.input}
        textAlign='right'
        keyboardType="numeric"
        maxLength={2}
        // placeholder counts for cursor position => causes flicker when value changes
        // placeholder={'0'}
        // placeholderTextColor='transparent'
        onChangeText={(text) => {
          handleChange(text)
        }}
        value={value}
        ref={inputRef}
        selectionColor={'#D03050'}
        // onFocus={setIsFocused(true)}
        // onBlur={setIsFocused(false)}
        // onKeyPress={({ nativeEvent }) => {
          // Native event for this prop
          // console.log(nativeEvent)

          // Programatically set selection
          // inputRef.current.setNativeProps({selection: { start: 1, end: 1 }})

          // Set selection through state and providing state to selection prop
          // setSelection(prevState => ({
          //   ...prevState,
          //   start: 0,
          //   end: 0,
          // }))
        // }}
        // selection={selection}
        onFocus={() => setKeyboardVisible(true)}
        onBlur={() => setKeyboardVisible(false)}
        />
        <TouchableWithoutFeedback onPress={() => handlePress()}>
          <View style={styles.value}>
            <Text
            style={[styles.text, {fontSize: 24, fontWeight: 'bold'}, !value && {color: '#C8C0B8'}]}>{value ? value :
            inputRef.current?.isFocused() ? '' : '0'}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.text}>reps</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'transparent',
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
  value: {
    // flex: 1,
    position: 'absolute',
    // backgroundColor: 'blue',
    width: 40,
    height: 40,
    top: 12,
    left: 39,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default RepsInput;