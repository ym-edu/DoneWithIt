import React from 'react';
import { StyleSheet, View } from 'react-native';

function Container({children, style, ...rest}) {
  return (
    <View style={[styles(rest).container, style]}>
      {children}
    </View>
  );
}

const styles = ({m, mH, mB, mT, bgColor}) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    margin: m,
    marginHorizontal: mH,
    marginBottom: mB,
    marginTop: mT,
  },
})

export default Container;