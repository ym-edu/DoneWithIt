import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './AppTabs'

const Stack = createStackNavigator();

export default function RootStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={AppTabs}/>
      </Stack.Navigator>
  );
}
