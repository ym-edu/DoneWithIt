import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Layout from './app/layout';
import { Explore, Library, Log } from './app/screens'

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Layout>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Explore">
          <Tab.Screen name="Explore" component={Explore} />
          <Tab.Screen name="Log" component={Log} />
          <Tab.Screen name="Library" component={Library} />
        </Tab.Navigator>
      </NavigationContainer>
    </Layout>
  );
}
