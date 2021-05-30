import React, { createContext, useContext } from "react"
import { makeAutoObservable } from 'mobx';

const RoutineStore = makeAutoObservable({
  //IMPORTANT: function expressions () => {} don't have 'this'
  routineId: '',
  routineName: '',
  exercises: [],
  // invertedExercises: [],
  menuState: [],
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

    //Set menuState observalbe
    const initialState = exercises.map(() => false)
    this.menuState.replace(initialState)
  },

  get invertedExercises() {
    return this.exercises.slice().reverse();
  },

  openMenu: function(index) {
    this.menuState.fill(false) //Close all menus before opening menu at index
    this.menuState.splice(index, 1, true)
  },

  closeMenu: function(index) {
    this.menuState.splice(index, 1, false)
  },

  isMenuOpen: function(index) {
    if(index < 0 || index > this.menuState.length-1) return false
    return this.menuState[index]
  },

  get exerciseCount() {
    return this.exercises.length;
  },

  setNextExerciseIndex: function(index) {
    this.nextExerciseIndex = index
  },

  clearStore: function() {
    this.routineId = '';
    this.routineName = '';
    this.exercises.replace([]);
    this.menuState.replace([]);
    this.nextExerciseIndex = 0;
  }
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
