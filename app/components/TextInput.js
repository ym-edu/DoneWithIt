import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { constants } from '../config';
const { colors, sizes } = constants;

function Input({ label, getValue }) {
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
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: sizes.fullWidth,
    backgroundColor: 'transparent',
  },
})

export default Input;
