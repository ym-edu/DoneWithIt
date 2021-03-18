import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Explore, Library, Log } from '../screens';
import { useIcon } from '../layout';

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  const Icon = useIcon();

  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Explore"
      backBehavior="none"
      shifting={true}
      labeled={true}
      activeColor={'#FFF'}
      inactiveColor={'#C0C0B87F'}
      barStyle={{ backgroundColor: '#242626' }}
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
        component={Library}
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
