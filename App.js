import React, { Fragment, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import ViewImageScreen from './app/screens/ViewImageScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Sandbox from './app/screens/Sandbox';

import AppText from './app/components/AppText';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import RooIcons from './RooIcons'
import Colors from './app/config/colors'


export default function App() {
  const fetchFonts = () => {
  return Font.loadAsync({
  'RooIcons': require('./app/assets/fonts/RooIcons.ttf')
  });
  };

  const [fontloaded,setfontloaded]=useState(false);

  if(!fontloaded){
    return(
      <AppLoading
      startAsync={fetchFonts}
      onFinish={()=>{setfontloaded(true)}}
      onError={console.warn}/>
    )
  }

  return (
    <Fragment>
      <WelcomeScreen>
        <RooIcons name={'flex'} size={80} color={Colors.highlight} />
      </WelcomeScreen>
      {/* <Sandbox /> */}
        {/* <RooIcons name={'media-empty'} size={40} color={Colors.highlight} /> */}
      {/* <AppText>WhatSupp</AppText> */}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDarker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: Colors.primaryLighter,
    borderRadius: 100,
  }
})