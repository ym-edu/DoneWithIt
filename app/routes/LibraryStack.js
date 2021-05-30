import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Library from '../screens/LibraryTab';
import Exercises from '../screens/Exercises';
import Workout from '../screens/Workout';
import Options from '../components/Options';

import { HeaderBackButton } from '@react-navigation/stack';
import { useRoutineStore } from '../hooks/useRoutineStore';

const Stack = createStackNavigator();

export default function LibraryStack() {
  const routineStore = useRoutineStore();

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
        options={{title: 'Exercises'}}
        />
        <Stack.Screen
        name='Workout'
        component={Workout}
        options={({navigation, route: {params: {exercises, exerciseIndex, workoutName, workoutId}}}) => {
          return {
            headerTitle: workoutName,
            headerLeft: ({ onPress }) => (
            <HeaderBackButton
              tintColor={'white'}
              onPress={() => {
                routineStore.clearStore()
                onPress()
              }}
            />
            ),
            headerRight: () => (
            <Options onPress={() => {
              // console.log(title)
              navigation.navigate('WorkoutOptionsModal', {
                exercises: exercises, //Compensation for 'inverted' list
                exerciseIndex: exerciseIndex,
                workoutId: workoutId,
                workoutName: workoutName,
              })
            }}/>
            ),
          }
        }}
        />
      </Stack.Navigator>
  );
}
