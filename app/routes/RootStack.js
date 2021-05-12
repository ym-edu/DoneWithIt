import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppTabs from './AppTabs';
import Splash from '../screens/Splash';
import AuthStack from './AuthStack';
import MyExercisesModal from '../screens/MyExercisesModal';
import CreateWorkout from '../screens/CreateWorkout';

import { useAuth, useAuthUpdate } from '../hooks/useAuth';

const Stack = createStackNavigator();

export default function RootStack() {
  const auth = useAuth();
  const setAuth = useAuthUpdate();

  React.useEffect(() => {
    setTimeout(() => {
      setAuth.load()
    }, 3000)
  }, [])

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
      name="Modal"
      component={MyExercisesModal}
      options={{
        animationEnabled: true,
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
