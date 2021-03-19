import React from 'react';
import { StyleSheet, View } from 'react-native';

function Spacer(props) {
  return (
    <View style={styles(props).space}/>
  );
}

const styles = ({mV, mH}) => StyleSheet.create({
  space: {
    marginTop: mV,
    marginRight: mH,
  },
})

export default Spacer;