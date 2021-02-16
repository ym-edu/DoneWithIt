import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors'
import data from '../config/data'
import Card from '../components/Card/Card'


function Sandbox() {
  const itemNum = 0;
  console.log('=============TESTING================')
  console.log('Sandbox', data[itemNum].liked);

  const renderSwitch = (item) => {
    switch(item.mode) {
      case 'r1':
      case 'r2':
        return `${item.reps} reps`;
        break;
      case 't1':
      case 't2':
        return `${item.min} min ${item.sec} sec`
      default:
        alert('NAN');
    }
  }

  return (
      <View style={styles().screen}>
        <Card
        media={'../../assets/thumbnail.jpg'}
        title={data[itemNum].title}
        subtitle={renderSwitch(data[itemNum])}
        colors={colors}
        liked={data[itemNum].liked}
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