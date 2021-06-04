import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Train from '../screens/Train';
import TrainComplete from '../screens/TrainComplete';

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
        <Stack.Screen name="TrainComplete" component={TrainComplete}/>
      </Stack.Navigator>
  );
}
