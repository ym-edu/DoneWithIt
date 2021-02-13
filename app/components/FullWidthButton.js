import React from 'react';
import { View, StyleSheet } from 'react-native';

function FullWidthButton(props) {
  return (
    <View style={styles(props).button} />
  );
}

const styles = (props) => StyleSheet.create({
  button: {
    backgroundColor: props.color,
    width: '100%',
    height: 50,
  },
})

export default FullWidthButton;