import React from 'react';
import { Text, StyleSheet } from 'react-native';

function TitleText({ children, spacer }) {
  return (
    <Text style={[styles.title, {marginVertical: spacer}]}>{children}</Text>
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