import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { date } from "yup";
import { setup, teardown } from './helpers';

const myId = "my-user";
const otherId = "other-user";

const mockUser = {
  uid: myId,
  email: "example@email.com",
};

// Each key represents a path in the database - "COLLECTION/DOC": {DATA_PAYLOAD}
const mockData = {
  [`users/${mockUser.uid}`]: {
    userName: 'My User',
  },
  [`users/${otherId}`]: {
    userName: 'Other User',
  },

  [`users/${mockUser.uid}/parentExercises/exercise-1`]: {
    exerciseName: 'Exercise One',
  },
  [`users/${mockUser.uid}/parentExercises/_tally`]: {
    parentExercise_count: 6, // Limit for free users 
  },

  [`users/${mockUser.uid}/workouts/workout-1`]: {
    workoutName: 'Exercise One',
  },
  [`users/${mockUser.uid}/workouts/workout-2`]: {
    workoutName: 'Exercise One',
  },
  [`users/${mockUser.uid}/workouts/_tally`]: {
    workout_count: 3, // Limit for free users 
  },

  [`users/${mockUser.uid}/workouts/workout-2/childExercises/exercise-1`]: {
    exerciseName: `Exercise One`,
    exerciseName_std: `Exercise One`.toLowerCase(),
    video: {
      endTimeSec: 5,
      startTimeSec: 10,
      url: 'ytURL',
    },
    mode: {
      current: "fixedReps",
      fixedReps: 8,
      repsToFailure: 12,
      fixedTime: 30000,
      timeToFailure: 90000,
    },
    parentExercise_ref: "parentExercise-1",
    position: 10,
    weight: {
      current: "kg",
      kg: 6,
      lb: 12,
    },
  },
  [`users/${mockUser.uid}/workouts/workout-2/childExercises/_tally`]: {
    childExercise_count: 0, // Limit for free users
    childExercise_index: 0,
  },
};

describe('Security Rules', () => {
  let db, db_; // db for authorized requests (i.e. logged in user), otherwise db_

  // Applies only to tests in this describe block
  beforeAll(async () => {
    ({ db, db_ } = await setup(mockUser, mockData));
  });
  afterAll(async () => {
    await teardown();
  });

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Tests >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  test.todo("FOLLOW CONVENTION: deny/allow (who) to read/write to (what/where)");
  //================================================================================
  /** @ /root/...
   * deny all requests to unauthorized users (i.e. non authenticated || not logged in)
   * deny authorized users any requests to collections/docs that are not their own
   */
  test("deny unauthorized users to read/write to any collection", async () => {
    const usersRef = db_.collection("users");

    const parentExercisesRef = usersRef.doc(mockUser.uid).collection("parentExercises");
    const exerciseSessionsRef = parentExercisesRef.doc("exercise-1").collection("exerciseSessions");

    const workoutsRef = usersRef.doc(mockUser.uid).collection("workouts");
    const childExercisesRef = workoutsRef.doc("workout-1").collection("childExercises");

    const workoutSessionsRef = usersRef.doc(mockUser.uid).collection("workoutSessions");

    const refs = [
      usersRef,
      parentExercisesRef,
      exerciseSessionsRef,
      workoutsRef,
      childExercisesRef,
      workoutSessionsRef,
    ];

    const promises = refs.map(async (ref) => {
      // Read requests
      await assertFails(ref.doc(mockUser.uid).get()); //get
      await assertFails(ref.get()); //list

      // Write requests
      await assertFails(ref.add({test: "testing"})); //create
      await assertFails(ref.doc(mockUser.uid).set({test: "testing"})); //create
      await assertFails(ref.doc(mockUser.uid).update({test: "testing"})); //update
      await assertFails(ref.doc(mockUser.uid).delete()); //delete
    });

    await Promise.all(promises);
  });

  test("deny authorized users to read/write to any collection that is not their own", async () => {
    const usersRef = db.collection("users");

    const parentExercisesRef = usersRef.doc(otherId).collection("parentExercises");
    const exerciseSessionsRef = parentExercisesRef.doc("exercise-1").collection("exerciseSessions");

    const workoutsRef = usersRef.doc(otherId).collection("workouts");
    const childExercisesRef = workoutsRef.doc("workout-1").collection("childExercises");

    const workoutSessionsRef = usersRef.doc(otherId).collection("workoutSessions");

    const refs = [
      usersRef,
      parentExercisesRef,
      exerciseSessionsRef,
      workoutsRef,
      childExercisesRef,
      workoutSessionsRef,
    ];

    const promises = refs.map(async (ref) => {
      // Read requests
      await assertFails(ref.doc(otherId).get()); //get
      await assertFails(ref.get()); //list

      // Write requests
      await assertFails(ref.add({test: "testing"})); //create
      await assertFails(ref.doc(otherId).set({test: "testing"})); //create
      await assertFails(ref.doc(otherId).update({test: "testing"})); //update
      await assertFails(ref.doc(otherId).delete()); //delete
    });

    await Promise.all(promises);
  });
  //================================================================================
  /** @ /root/users
   * 
   */
  test("allow our user to read their own userDoc", async () => {
    const ref = db.collection("users");
    expect(await assertSucceeds(ref.doc(mockUser.uid).get())); //get
  });

  test("deny our user to read a userDoc that is not their own", async () => {
    const ref = db.collection("users");
    expect(await assertFails(ref.doc(otherId).get())); //get
    expect(await assertFails(ref.get())); //list
  });
  //================================================================================
  /** @ /root/users/parentExercises - CreateExercise.js
   * * IMPORTANT: Requires Cloud Function to truly prevent parentExercise_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * delete requests for a _tally doc are denied by default
   * free users are limited to a parentExercise_count of 6
   * if a client tries to bypass that limit by setting the count <= 6, the write will fail because each request requires that the count be incremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the creation of a new parentExercise
  */

  test("deny our user ability to delete their parentExercise _tally doc", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises").doc("_tally");
    expect(await assertFails(ref.delete()))
  });

  //CLOUD FUNCTION REQUIRED - This test passing is equivalent to a batch write failing
  test.skip("deny our user to create a parentExercise if tally does not increment by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises");
    expect(await assertFails(ref.doc("_tally").set({ //create
      parentExercise_count: 5,
    }, { merge: true })));
    expect(await assertFails(ref.doc("_tally").set({ //create
      parentExercise_count: 6,
    }, { merge: true })));
    expect(await assertFails(ref.doc("_tally").set({ //create
      parentExercise_count: 8,
    }, { merge: true })));
  });

  // This test passing is equivalent to a batch write succeeding
  test("allow our user to create their own parentExercise only if tally increments by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises");

    //Check for invalid update
    expect(await assertFails(ref.doc("_tally").update({
      parentExercise_count: 6,
    })));

    expect(await assertSucceeds(ref.add({ //create
      children_count: 0,
      exerciseName: 'Exercise One',
      exerciseName_std: 'Exercise One'.toLowerCase(),
      video: {
        endTimeSec: 5,
        startTimeSec: 10,
        url: 'ytURL',
      },
    })));
    expect(await assertSucceeds(ref.doc("_tally").set({ //create
      parentExercise_count: 7,
    })));
  });
  //================================================================================
  /** @ /root/users/parentExercises - ExerciseList.js
   * user can only list their own parentExercises
   * TODO: validate that data requested is in ascending order
   * TODO: lazy load or limit request payload
  */

  test("allow our user to read their own list of parentExercises", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises");
    expect(await assertSucceeds(ref.get())) //list
  });
  //================================================================================
  /** @ /root/users/parentExercises - ParentExerciseUpdate.js
   * user can only update their own parentExercises
   * all fields are mutable
   * TODO: validate fields
  */

 test("allow user to update their own parentExercise", async () => {
  const ref = db.collection("users").doc(mockUser.uid)
                .collection("parentExercises");
  expect(await assertSucceeds(ref.doc("exercise-1").update({ //update
    exerciseName: "Exercise One Updated"
  })));
 });
 //================================================================================
  /** @ /root/users/parentExercises - ExerciseOptions.js
   * IMPORTANT: Requires Cloud Function to truly prevent parentExercise_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * user can only delete their own parentExercises
   * each request requires that the count be decremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the deletion of a new parentExercise
  */
  
  //CLOUD FUNCTION REQUIRED - This test passing is equivalent to a batch write failing
  test.skip("deny our user updates to a parentExercise if tally does not decrement by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
    .collection("parentExercises").doc("_tally");

    expect(await assertFails(ref.update({ //update
      parentExercise_count: 5,
    })));
    expect(await assertFails(ref.update({ //update
      parentExercise_count: 7,
    })));
    expect(await assertFails(ref.update({ //update
      parentExercise_count: 8,
    })));
  });

  test("allow our user to delete their own parentExercises only if tally decrements by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises");
                  
    //Check for invalid update
    expect(await assertFails(ref.doc("_tally").update({
      parentExercise_count: 7,
    })));
    
    expect(await assertSucceeds(ref.doc("exercise-1").delete())); //delete
    expect(await assertSucceeds(ref.doc("_tally").update({
      parentExercise_count: 6,
    })));
  });
  //================================================================================
  /** @ /root/users/workouts - CreateWorkout.js
   * * IMPORTANT: Requires Cloud Function to truly prevent workout_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * delete requests for a _tally doc are denied by default
   * free users are limited to a workout_count of 3
   * if a client tries to bypass that limit by setting the count <= 3, the write will fail because each request requires that the count be incremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the creation of a new parentExercise
  */

   test("deny our user ability to delete their workouts _tally doc", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("_tally");
    expect(await assertFails(ref.delete()))
  });

  test("allow our user to create their own workout only if tally increments by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts");

    //Check for invalid update
    expect(await assertFails(ref.doc("_tally").update({
      workout_count: 3,
    })));

    expect(await assertSucceeds(ref.add({ //create
      workoutName: 'Workout One',
      workoutName_std: 'Workout One'.toLowerCase(),
    })));
    expect(await assertSucceeds(ref.doc("_tally").set({ //create
      workout_count: 4,
    })));
    expect(await assertSucceeds(ref.doc("workout-1").collection("childExercises").doc("_tally").set({
      childExercise_count: 0,
      childExercise_index: 0,
    })));
  });
  //================================================================================
  /** @ /root/users/workouts - LibraryTab.js
   * user can only list their own workouts
   * user can only get their total exercise count
   * TODO: validate that data requested is in ascending order
  */

  test("allow our user to read their own list of workouts", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts");

    expect(await assertSucceeds(ref.get())) //list
  });

  test("allow our user to read their own exercise total", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises").doc("_tally");

    expect(await assertSucceeds(ref.get())) //get
  });
  //================================================================================
  /** @ /root/users/workouts - UpdateWorkout.js
   * user can only update their own workouts
   * all fields are mutable
   * TODO: validate fields
  */

  test("allow user to update their own workout", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts");

    expect(await assertSucceeds(ref.doc("workout-1").update({ //update
      workoutName: "Workout One Updated",
    })));
  });
  //================================================================================
  /** @ /root/users/workouts - ExerciseOptions.js
   * IMPORTANT: Requires Cloud Function to truly prevent workout_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * user can only delete their own workouts
   * each request requires that the count be decremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the deletion of a new parentExercise
  */

   test("allow our user to delete their own parentExercises only if tally decrements by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts");
                  
    //Check for invalid update
    expect(await assertFails(ref.doc("_tally").update({
      workout_count: 4,
    })));
    
    expect(await assertSucceeds(ref.doc("workout-1").delete())); //delete
    expect(await assertSucceeds(ref.doc("_tally").update({
      workout_count: 3,
    })));
  });
  //================================================================================
  /** @ /root/users/workouts/workout-2/childExercises - AddExercises.js
   * * IMPORTANT: Requires Cloud Function to truly prevent childExercise_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * delete requests for a _tally doc are denied by default
   * free users are limited to a childExercise_count of 10
   * if a client tries to bypass that limit by setting the count <= 10, the write will fail because each request requires that the count be incremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the creation of a new parentExercise
   * TODO: validate that index is equal to current index of iteration
  */

   test("deny our user ability to delete their childExercise _tally doc", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises").doc("_tally");
    expect(await assertFails(ref.delete()))
  });

  // This test passing is equivalent to a batch write succeeding
  test("allow our user to add their own childExercises only if tally increments by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises");

    let promises = [];

    for (let i = 1; i <= 10; i++) {
      // Check for invalid update
      promises.push(await assertFails(ref.doc("_tally").update({
        childExercise_count: i - 1,
      })));

      promises.push(await assertSucceeds(ref.add({ //create
        exerciseName: `Exercise ${i}`,
        exerciseName_std: `Exercise ${i}`.toLowerCase(),
        video: {
          endTimeSec: 5,
          startTimeSec: 10,
          url: 'ytURL',
        },
        mode: {
          current: "fixedReps",
          fixedReps: 8,
          repsToFailure: 12,
          fixedTime: 30000,
          timeToFailure: 90000,
        },
        parentExercise_ref: "parentExercise-1",
        position: i - 1,
        weight: {
          current: "kg",
          kg: 5,
          lb: 12,
        }
      })));

      promises.push(await assertSucceeds(ref.doc("_tally").set({ //create
        childExercise_count: 0 + i,
        childExercise_index: i - 1,
      })));
    }

    await Promise.all(promises);
  });
  //================================================================================
  /** @ /root/users/workouts/workout-2/childExercises - Workout.js
   * user can only list their own childExercises
   * user can only get their total childExercise_count
   * TODO: validate that data requested is in ascending order
  */

   test("allow our user to read their own list of childExercises", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises");

    expect(await assertSucceeds(ref.get())) //list
  });

  test("allow our user to read their own childExercise_count", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises").doc("_tally");

    expect(await assertSucceeds(ref.get())) //get
  });
  //================================================================================
  /** @ /root/users/workouts/workout-2/childExercises - ChildExerciseUpdate.js && SortChildExercises.js
   * user can only update their own childExercises
   * IMPORTANT: not all fields are mutable
   * TODO: validate fields
  */

  test("deny user updates to childExercise immutable fields", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises").doc("exercise-1");

    expect(await assertFails(ref.update({ //update
      exerciseName: `Test Exercise`,
      exerciseName_std: `Test Exercise`.toLowerCase(),
      video: {
        endTimeSec: 10,
        startTimeSec: 15,
        url: 'YTurl',
      },
      mode: {
        current: "fixedTime",
        fixedReps: 12,
        repsToFailure: 8,
        fixedTime: 90000,
        timeToFailure: 30000,
      },
      parentExercise_ref: "parentExercise-2",
      position: 1,
      weight: {
        current: "lb",
        kg: 12,
        lb: 6,
      },
    })));
  });

  test("allow user updates to childExercise mutable fields", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises").doc("exercise-1");

    expect(await assertSucceeds(ref.update({ //update
      mode: {
        current: "fixedTime",
        fixedReps: 12,
        repsToFailure: 8,
        fixedTime: 90000,
        timeToFailure: 30000,
      },
      position: 11,
      weight: {
        current: "lb",
        kg: 12,
        lb: 6,
      },
    })));
  });
  //================================================================================
  /** @ /root/users/workouts/workout-2/childExercises - ExerciseOptions.js
   * IMPORTANT: Requires Cloud Function to truly prevent workout_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * user can only delete their own childExercises
   * each request requires that the count be decremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the deletion of a new parentExercise
  */

  test("allow our user to delete their own childExercises only if tally decrements by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("workouts").doc("workout-2")
                  .collection("childExercises");
                  
    //Check for invalid update
    expect(await assertFails(ref.doc("_tally").update({
      childExercise_count: 10,
    })));
    
    expect(await assertSucceeds(ref.doc("exercise-1").delete())); //delete
    expect(await assertSucceeds(ref.doc("_tally").update({
      childExercise_count: 9,
    })));
  });
  //================================================================================
  /** @ /root/users/workoutSessions - Train.js //UNFINISHED
   * * IMPORTANT: Requires Cloud Function to truly prevent workoutSession_count bypass
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * delete requests for a _tally doc are denied by default
   * free users are limited to a workoutSession_count of 6
   * if a client tries to bypass that limit by setting the count <= 6, the write will fail because each request requires that the count be incremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the creation of a new parentExercise
  */

  //  test.only("deny our user ability to delete their workoutSessions _tally doc", async () => {
  //   const ref = db.collection("users").doc(mockUser.uid)
  //                 .collection("workoutSessions").doc("_tally");
  //   expect(await assertFails(ref.delete()))
  // });

  // // This test passing is equivalent to a batch write succeeding
  // test.only("allow our user to create their own workoutSession only if tally increments by 1", async () => {
  //   const ref = db.collection("users").doc(mockUser.uid)
  //                 .collection("workoutSessions");

  //   //Check for invalid update
  //   expect(await assertFails(ref.doc("_tally").update({
  //     workoutSession_count: 5,
  //   })));

  //   expect(await assertSucceeds(ref.add({ //create
  //     completedExercisesCount: 1,
  //     createdOn: new Date(),
  //     duration: 30000,
  //     exerciseCount: 6,
  //     exercises: [{exerciseName: "Exercise One"}],
  //     sessionEnd: Date.now(),
  //     sessionStart: Date.now()
  //   })));

  //   expect(await assertSucceeds(ref.doc("_tally").set({ //create
  //     workoutSession_count: 6,
  //   })));
  // });
});
