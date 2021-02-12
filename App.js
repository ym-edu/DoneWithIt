import React, { Fragment } from 'react';

import ViewImageScreen from './app/screens/ViewImageScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Sandbox from './app/screens/Sandbox';

import AppText from './app/components/AppText';


export default function App() {
  return (
    <Fragment>
      <Sandbox />
      <AppText>WhatSupp</AppText>
    </Fragment>
  );
}
