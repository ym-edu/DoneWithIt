import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors'
import Card from '../components/Card/Card'


function Sandbox() {
  return (
      <View style={styles().screen}>
        <Card colors={colors}></Card>
      </View>
  );
}


const styles = () => StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: colors.primaryDarker,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Sandbox;