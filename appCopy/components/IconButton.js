import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import RooIcons from './RooIcons';

function IconButton(props) {
  const sizeDoubled = props.size * 2;

  const constants = {
    boxSize: sizeDoubled,
  }

  const fetchFonts = () => {
    return Font.loadAsync({
    'RooIcons': require('../assets/fonts/RooIcons.ttf')
    });
    };

    const [ fontloaded, setfontloaded ] = useState(false);

  if(!fontloaded) {
    return(
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => {setfontloaded(true)}}
      onError={console.warn}/>
    )
  }

  return (
    <View style={[styles( props, constants ).button, props.modStyle]}>
      <RooIcons name={props.icon} size={props.size} color={props.iconColor} />
    </View>
  );
}

const styles = (props, constants ) => StyleSheet.create({
  button: {
    backgroundColor: props.halo ? props.buttonColor : null,
    alignItems: 'center',
    justifyContent: 'center',
    width: constants.boxSize,
    height: constants.boxSize,
    borderRadius: props.size,
  },
})

export default IconButton;