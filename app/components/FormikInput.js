import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../config/constants/colors'

function Input({onChangeText, onBlur, value, label, secureTextEntry, keyboardType}) {
  const theme = {
    colors: {
      placeholder: colors.secondaryDarker,
      primary: colors.accent,
      text: colors.secondary,
    }
  }

  return (
    <TextInput
    theme={theme}
    mode={'flat'}
    underlineColor={colors.primaryLighter}
    selectionColor={colors.accent}
    style={styles.textInput}
    label={label}
    value={value}
    onChangeText={onChangeText}
    onBlur={onBlur}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
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
