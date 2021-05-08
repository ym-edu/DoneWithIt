import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { constants } from '../config';
const { colors } = constants;
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { IconProvider } from './shared/IconContext';

export default function Layout({children}) {
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
    <IconProvider>
      <SafeAreaView style={styles.screenBar}>
        <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : null} //Works for createWorkout but not good for createExercise (hiding bottom submit bar)
        style={{flex: 1}}
        >
          <StatusBar
            style={'light'} //TODO: Toggle dark mode through device system settings
            backgroundColor={colors.primaryLighter}
            translucent={false}
            />
            {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </IconProvider>
  );
}

const styles = StyleSheet.create({
  screenBar: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
  },
  content: {
    flex: 1,
  },
})
