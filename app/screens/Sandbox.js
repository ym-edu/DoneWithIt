import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import colors from '../config/colors'
import data from '../config/data'
import Card from '../components/Card/Card'


function Sandbox() {
  const itemNum = 0;

  const renderSwitch = (item) => {
    switch(item.mode) {
      case 'r1':
      case 'r2':
        return `${item.reps} reps`;
        break;
      case 't1':
      case 't2':
        return (
          `${item.min === 0 ? '' : `${item.min} min `}${item.sec === 0 ? '' : `${item.sec} sec`}`
        )
      default:
        alert('NAN');
    }
  }

  return (
      <View style={styles().screen}>
        <View style={[styles().content, styles().single]}>
          <Card
            media={require('../assets/thumbnail.jpg')}
            title={data[itemNum].title}
            subtitle={renderSwitch(data[itemNum])}
            colors={colors}
            liked={data[itemNum].liked}
          />
        </View>
        <FlatList style={styles().content}
          data={data}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <Card
              media={require('../assets/thumbnail.jpg')}
              title={item.title}
              subtitle={renderSwitch(item)}
              colors={colors}
              liked={item.liked}
            />
          )}
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
  content: {
    flex: 1,
    width: '100%',
  },
  single: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Sandbox;