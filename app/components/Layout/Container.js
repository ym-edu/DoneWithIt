import React from 'react';
import { StyleSheet, View } from 'react-native';

function Container({children, style, ...rest}) {
  return (
    <View style={[styles(rest).container, style]}>
      {children}
    </View>
  );
}

const styles = ({m, mH, mB, mT}) => StyleSheet.create({
  container: {
    flex: 1,
    margin: m,
    marginHorizontal: mH,
    marginBottom: mB,
    marginTop: mT,
  }
})

export default Container;