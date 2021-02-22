import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { constants } from '../config';
const { colors } = constants;
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import RooIcons from './shared/RooIcons';

export const ConfigContext = React.createContext();
const Provider = ConfigContext.Provider;

export default function Screen({children}) {
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

  function Icon({name,size,color,container}) {
    const containerSize = size * 2;

    const iconStyle = {
      width: containerSize,
      height: containerSize,
      backgroundColor: container ? colors.primaryLighter : null,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size,
    }

    return (
      <View style={iconStyle}>
        <RooIcons name={name} size={size} color={color}/>
      </View>
    )}

  return (
    <Provider value={Icon}>
      <SafeAreaView style={styles.screenBar}>
        <StatusBar
          style={'light'}
          backgroundColor={colors.primaryLighter}
          translucent={false}
        />
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screenBar: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primaryDarker,
  },
})
