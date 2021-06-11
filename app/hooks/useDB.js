import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from './useAuth';

const DBContext = React.createContext();

export function useDB() {
  return useContext(DBContext);
}

export default function DBProvider({ children }) {
  const db = firestore;
  const { user } = useAuth();

  const userRef = firestore().collection("users").doc(user);
  const parentExercisesRef = userRef.collection("parentExercises");
  const workoutsRef = userRef.collection("workouts");
  
  const increment = firestore.FieldValue.increment(1);
  const decrement = firestore.FieldValue.increment(-1);
  const timestamp = firestore.FieldValue.serverTimestamp();

  const parentExercisesTally = parentExercisesRef.doc("_tally");
  const workoutsTally = workoutsRef.doc("_tally")

  const getDB = {
    db,
    userRef,
    parentExercises: {
      ref: parentExercisesRef,
      tally: parentExercisesTally
    },
    workouts: {
      ref: workoutsRef,
      tally: workoutsTally,
    },
    increment,
    decrement,
    timestamp,
  }

  return (
    <DBContext.Provider value={getDB}>
        {children}
    </DBContext.Provider>
  )
}
