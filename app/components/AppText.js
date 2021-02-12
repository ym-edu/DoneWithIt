import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';

function AppText({children}) {
  return (
    <Text style={styles.text}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'black',
    color: 'red',
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    textAlign: 'center',
  }
})

export default AppText;