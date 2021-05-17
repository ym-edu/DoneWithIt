import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTabs from './AppTabs';
import Splash from '../screens/Splash';
import AuthStack from './AuthStack';
import CreateExercise from '../screens/CreateExercise';
import Search from '../screens/Search';
import CreateWorkout from '../screens/CreateWorkout';
import AddExercises from '../screens/AddExercises';

import WorkoutOptions from '../screens/WorkoutOptions';

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

  const modalOptions = {
    animationEnabled: false,
    cardStyle: { backgroundColor: Platform.OS === 'android' ? '#171818' : '#0000001A' },
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
  };

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
      options={modalOptions}
      />
      <Stack.Screen
      name="AddExercises"
      component={AddExercises}
      options={{
        animationEnabled: true,
      }}
      />
      <Stack.Screen
      name="WorkoutOptions"
      component={WorkoutOptions}
      options={{...modalOptions, 
        cardStyle: { backgroundColor: Platform.OS === 'android' ? '#0000001A' : '#0000001A' }
      }}
      />
    </Stack.Navigator>
  );
}
