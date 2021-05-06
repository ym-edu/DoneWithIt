import React, { useRef, useEffect } from 'react';
import { StyleSheet, Keyboard, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { constants } from '../config';
import { useLoopUpdate } from '../hooks/useLoop';
const { colors } = constants;

function Input({ label, getValue, focus }) {
  const { setKeyboardVisible } = useLoopUpdate();
  const inputRef = useRef()

  useEffect(() => {
    if(focus) {
      inputRef.current.focus()
    }
  }, [])

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

  const theme = {
    colors: {
      placeholder: colors.secondaryDarker,
      primary: colors.accent,
      text: colors.secondary,
    }
  }

  return (
    <TextInput style={styles.textInput} theme={theme}
      mode={'flat'}
      label={label}
      underlineColor={colors.primaryLighter}
      selectionColor={colors.accent}
      // onSubmitEditing={({ nativeEvent }) => { getValue(nativeEvent.text) }} // User must hit enter to set input and before it can be sent on submit, otherwise an empty string will be sent.
      // onChangeText={(input) => getValue(input)} // Value is set everytime user types and is sent on submit
      onChangeText={(input) => null} 
      ref={inputRef}
      onFocus={() => setKeyboardVisible(true)}
      onBlur={() => setKeyboardVisible(false)} //On 'keyboardDidHide' from form Screen's useEffect
      autoCorrect={false}
      keyboardType={Platform.OS === 'android' ? "visible-password" : "default"}
      />
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: 'transparent',
  },
})

export default Input;
