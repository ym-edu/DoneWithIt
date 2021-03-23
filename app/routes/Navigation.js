import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStack from './RootStack';
import AuthProvider from '../hooks/useAuth';

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
      <AuthProvider>
        <RootStack/>
      </AuthProvider>
    </NavigationContainer>
  );
}
