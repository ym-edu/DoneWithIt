import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppTabs from './AppTabs';
import Splash from '../screens/Splash';
import AuthStack from './AuthStack';
import CreateExercise from '../screens/CreateExercise';
import Search from '../screens/Search';
import CreateWorkout from '../screens/CreateWorkout';

import { useAuth, useAuthUpdate } from '../hooks/useAuth';

const Stack = createStackNavigator();

export default function RootStack() {
  const auth = useAuth();
  const setAuth = useAuthUpdate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAuth.load()
    }, 3000);

    return () => clearTimeout(timer)
  }, [auth.user])

  return (
    <Stack.Navigator mode="modal"
    headerMode="none"
    screenOptions={{
      animationEnabled: false,
    }}
    >
      {
      auth.loading
      ? <Stack.Screen name="Splash" component={Splash} />
      : auth.user
        ? <Stack.Screen name="AppTabs" component={AppTabs} />
        : <Stack.Screen name="AuthStack" component={AuthStack} />
      }
      <Stack.Screen
      name="CreateExercise"
      component={CreateExercise}
      options={{
        animationEnabled: true,
      }}
      />
      <Stack.Screen
      name="Search"
      component={Search}
      options={{
        animationEnabled: false,
      }}
      />
      <Stack.Screen
      name="CreateWorkout"
      component={CreateWorkout}
      options={{
        animationEnabled: false,
        cardStyle: { backgroundColor: '#0000001A' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              })
            }
          }
        }
      }}
      />
    </Stack.Navigator>
  );
}
