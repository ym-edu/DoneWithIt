import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors'
import Card from '../components/Card/Card'


function Sandbox() {
  const data = {
    // title: `balance trainer single leg kneeling good morning`,
    title: `high knees running in place`,
    subtitle: `8 reps`
  }

  return (
      <View style={styles().screen}>
        <Card
        media={'../../assets/thumbnail.jpg'}
        title={data.title}
        subtitle={data.subtitle}
        colors={colors}
        />
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