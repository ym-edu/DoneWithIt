import React, { createContext, useContext } from "react"
import { makeAutoObservable } from 'mobx';

const RoutineStore = makeAutoObservable({
  //IMPORTANT: function expressions () => {} don't have 'this'
  routineId: '',
  routineName: '',
  exercises: [],
  // invertedExercises: [],
  // menusAreOpen: [],
  // exerciseCount: 0,
  nextExerciseIndex: 0,


  setRoutineId: function(id) {
    this.routineId = id;
  },
  setRoutineName: function(name) {
    this.routineName = name;
  },

  setExercises: function(exercises) {
    this.exercises.replace(exercises);
  },
  get invertedExercises() {
    return this.exercises.slice().reverse();
  },
  get menusAreOpen() {
    return this.exercises.map(() => false);
  },
  get exerciseCount() {
    return this.exercises.length;
  },

  setNextExerciseIndex: function(index) {
    this.nextExerciseIndex = index
  },
})

const RoutineStoreContext = createContext(null);

export const useRoutineStore = () => useContext(RoutineStoreContext);

export default function RoutineStoreProvider({children}) {
  const routineStore = RoutineStore;

  return (
    <RoutineStoreContext.Provider value={routineStore}>
      {children}
    </RoutineStoreContext.Provider>
  )
}
