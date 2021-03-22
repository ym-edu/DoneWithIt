import React from 'react';
import { StyleSheet, View } from 'react-native';

function Spacer({style, ...rest}) {
  return (
    <View style={[styles(rest).space, style]}/>
  );
}

const styles = ({mV, mH}) => StyleSheet.create({
  space: {
    paddingTop: mV,
    paddingRight: mH,
  },
})

export default Spacer;