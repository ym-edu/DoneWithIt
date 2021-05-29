import React, { createContext, useContext } from "react"
import { makeAutoObservable } from 'mobx';

// class WorkoutStore {
//   count = 0;

//   constructor() {
//     makeAutoObservable(this);
//   };

//   increment(multiplier) {
//     this.count += multiplier
//   };

//   decrement(multiplier) {
//     this.count -= multiplier
//   }
// }

const WorkoutStore = makeAutoObservable({
  //IMPORTANT: function expressions () => {} don't have 'this'
  exercises: [],
  setExercises: function (exercises) {
    this.exercises.replace(exercises)
  },
})

const WorkoutStoreContext = createContext(null);

export const useWorkoutStore = () => useContext(WorkoutStoreContext);

export default function WorkoutStoreProvider({children}) {
  // const workoutStore = new WorkoutStore();
  const workoutStore = WorkoutStore;

  return (
    <WorkoutStoreContext.Provider value={workoutStore}>
      {children}
    </WorkoutStoreContext.Provider>
  )
}
