import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors'
import data from '../config/data'
import Item from '../components/Item/Item'
import Card from '../components/Card/Card'
import Spacer from '../components/Spacer';
import appConstants from '../config/index'

import sizes from '../config/sizes'


function Sandbox() {
  const itemNum = 0;
  console.log('SIZES', sizes)

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
        {/* <View style={[styles().content, styles().single]}>
          <Item colors={colors} appConstants={appConstants}/>
        </View> */}
        <FlatList style={styles().content}
          data={data}
          keyExtractor={data => data.id.toString()}
          renderItem={({item, separators}) => (
            <>
            <Card
              media={require('../assets/thumbnail.jpg')}
              title={item.title}
              subtitle={renderSwitch(item)}
              colors={colors}
              liked={item.liked}
              onPress={() => null}
            />
            <Card
              media={require('../assets/thumbnail.jpg')}
              title={item.title}
              subtitle={renderSwitch(item)}
              colors={colors}
              liked={item.liked}
              onPress={() => null}
            />
            </>
          )}
          ItemSeparatorComponent={() => <Spacer space={8}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
  );
}


const styles = () => StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: colors.primaryDarker,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    height: sizes.screenHeight,
    backgroundColor: 'pink',
  },
  single: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Sandbox;