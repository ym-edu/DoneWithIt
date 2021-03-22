import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useIcon } from '../layout';
import { Explore, Log } from '../screens';
import LibraryStack from './LibraryStack'


const Tab = createMaterialBottomTabNavigator();

const Theme = { //TODO: Toggle dark mode through device system settings
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#171818', //Content area
    primary: '#242626', //Navigation bar & Back button :(
  }
}

export default function Tabs() {
  const Icon = useIcon();

  return (
    <NavigationContainer theme={Theme}>
      <Tab.Navigator
      initialRouteName="Explore"
      backBehavior="none"
      shifting={true}
      labeled={true}
      activeColor={'#FFF'}
      inactiveColor={'#C0C0B87F'}
      >
        <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color}) => (
            <Icon name="explore" size={24} color={color} style={{marginTop: -12}}/>
          ),
        }}
        />



        <Tab.Screen
        name="Log"
        component={Log}
        options={{
          tabBarLabel: 'Log',
          tabBarIcon: ({color}) => (
            <Icon name="stats" size={24} color={color} style={{marginTop: -12}}/>
          ),
        }}
        />



        <Tab.Screen
        name="Library"
        // component={Library}
        children={LibraryStack}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color}) => (
            <Icon name="layer" size={24} color={color} style={{marginTop: -12}}/>
          ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
