import React from 'react';
import { StyleSheet, Text } from 'react-native';

function TitleText({ children }) {

  return (
    <Text style={styles.text}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: "uppercase",
  },
})

export default TitleText;