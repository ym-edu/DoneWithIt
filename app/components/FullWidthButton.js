import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function FullWidthButton(props) {
  return (
    <View style={styles(props).button}>
      <Text style={styles(props).text}>
        {props.children}
      </Text>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: props.color,
    width: '100%',
    height: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  }
})

export default FullWidthButton;