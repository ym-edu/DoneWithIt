import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Library from '../screens/Library/LibraryTab'
import Exercises from '../screens/Library/MyExercises'

const Stack = createStackNavigator();

export default function LibraryStack() {
  return (
      <Stack.Navigator
      initialRouteName="Library"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#171818',
        },
      }}
      >
        <Stack.Screen
        name='Library'
        component={Library}
        options={{headerShown: false}}
        />

        <Stack.Screen
        name='Exercises'
        component={Exercises}
        options={{title: 'My Exercises'}}
        />
      </Stack.Navigator>
  );
}
