import React from 'react';
import { Text, StyleSheet } from 'react-native';

function TitleText({ children }) {
  return (
    <Text style={styles.title}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textTransform: "uppercase",
  },
})

export default TitleText;