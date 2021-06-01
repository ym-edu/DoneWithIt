import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Train from '../screens/Train';

const Stack = createStackNavigator();

export default function TrainStack() {
  return (
      <Stack.Navigator
      initialRouteName={"Train"}
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}
      >
        <Stack.Screen name="Train" component={Train}/>
      </Stack.Navigator>
  );
}
