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
  count: 0,
  increment: function(multiplier) {
    this.count += multiplier;
  },
  decrement: function(multiplier) {
    this.count -= multiplier;
  },
  setCount: function(newCount) {
    this.count = newCount;
  }
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
