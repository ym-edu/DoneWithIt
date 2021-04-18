import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator
      initialRouteName={"LogIn"}
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}
      >
        <Stack.Screen name="LogIn" component={LogIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}/>
      </Stack.Navigator>
  );
}
