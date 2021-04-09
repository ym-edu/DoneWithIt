import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { constants } from '../config';
const { colors, sizes } = constants;

function Input({ label, getValue, focus }) {
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
      onSubmitEditing={({ nativeEvent }) => { getValue(nativeEvent.text) }}
      ref={inputRef}
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
