import React from 'react';
import Screen from './app/components/Layout/Screen';
import { WelcomeScreen, ViewImageScreen, Sandbox } from './app/screens/index'


export default function App() {
  return (
    <Screen>
      {/* <WelcomeScreen /> */}
      <Sandbox/>
    </Screen>
  );
}