import React, { useRef, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { constants } from '../config';
const { colors } = constants;

function Input({ label, getValue, focus, value }) {
  const inputRef = useRef()

  useEffect(() => {
    if(focus) {
      inputRef.current.focus()
    }
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
      onChangeText={(input) => getValue(input)} 
      ref={inputRef}
      autoCorrect={false}
      keyboardType={Platform.OS === 'android' ? "visible-password" : "default"}
      value={value}
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
