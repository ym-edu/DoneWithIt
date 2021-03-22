import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppTabs from './AppTabs';

const Theme = { //TODO: Toggle dark mode through device system settings
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#171818', //Content area
    primary: '#242626', //Navigation bar & Back button :(
  }
}

export default function Navigation() {

  return (
    <NavigationContainer theme={Theme}>
      <AppTabs/>
    </NavigationContainer>
  );
}
