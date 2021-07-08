import React from 'react';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useIcon } from '../layout';
import { Ionicons } from '@expo/vector-icons';
import { Settings, Log } from '../screens';
import LibraryStack from './LibraryStack';


const Tab = createMaterialBottomTabNavigator();

export default function AppTabs() {
  const Icon = useIcon();

  return (
      <Tab.Navigator
      initialRouteName="Library"
      backBehavior="none"
      shifting={true}
      labeled={true}
      activeColor={'#FFF'}
      inactiveColor={'#C0C0B87F'}
      sceneAnimationEnabled={Platform.OS === 'android' ? false : true}
      keyboardHidesNavigationBar={true}
      barStyle={{ maxHeight: 54 }} //WTF: IDKY ios had thicker height        
      >
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
        name="Settings"
        component={Settings}
        options={{
          tabBarVisible: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
        }}
        />
      </Tab.Navigator>
  );
}
