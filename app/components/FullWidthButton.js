import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function FullWidthButton(props) {
  return (
    <TouchableOpacity style={styles(props).button} onPress={() => console.log('tapped'
    )}>
      <Text style={styles(props).text}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = (props) => StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: props.color,
    width: '100%',
    height: 50,
    borderRadius: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  }
})

export default FullWidthButton;