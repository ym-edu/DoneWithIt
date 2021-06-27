import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
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
  }
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

  test.todo("FOLLOW CONVENTION: deny/allow (who) to read/write to (what/where)");
  //================================================================================
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
      await assertFails(ref.doc(mockUser.uid).get()); // get
      await assertFails(ref.get()); // list

      // Write requests
      await assertFails(ref.add({test: "testing"})); // create
      await assertFails(ref.doc(mockUser.uid).set({test: "testing"})); // create
      await assertFails(ref.doc(mockUser.uid).update({test: "testing"})); // update
      await assertFails(ref.doc(mockUser.uid).delete()); // delete
    });

    await Promise.all(promises);
  });
  //================================================================================
  test("allow our user to read their own userDoc", async () => {
    const ref = db.collection("users");
    expect(await assertSucceeds(ref.doc(mockUser.uid).get())); // get
  });

  test("deny our user to read a userDoc that is not their own", async () => {
    const ref = db.collection("users");
    expect(await assertFails(ref.doc(otherId).get())); // get
    expect(await assertFails(ref.get())); // list
  });
  //================================================================================
  /** @ CreateExercise.js
   * NOTE: each test must run in isolation
   * unauthorized users (i.e. not logged in or not owner) are denied request by default
   * delete requests for a _tally doc are denied by default
   * free users are limited to a parentExercise_count of 6
   * if a client tries to bypass that limit by setting the count <= 6, the write will fail because each request requires that the count be incremented by 1
   * if a write to the _tally doc is denied, the whole batch write fails, thus preventing the creation of a new parentExercise
  */

  test("deny any user ability to delete a parentExercise _tally doc", async () => {
    const myUser = db.collection("users").doc(mockUser.uid)
    .collection("parentExercises").doc("_tally");
    const otherUser = db.collection("users").doc(otherId)
    .collection("parentExercises").doc("_tally");
    const nullUser = db_.collection("users").doc(otherId)
    .collection("parentExercises").doc("_tally");

    const promises = [myUser, otherUser, nullUser].map(async (ref) => {
      await assertFails(ref.delete())
    })

    await Promise.all(promises);
  });

  // This test passing is equivalent to a batch write succeeding
  test("allow our user to create their own parentExercise only if tally increments by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises");
    expect(await assertSucceeds(ref.add({
      children_count: 0,
      exerciseName: 'Exercise One',
      exerciseName_std: 'Exercise One'.toLowerCase(),
      video: {
        endTimeSec: 5,
        startTimeSec: 10,
        url: 'ytURL',
      },
    })));
    expect(await assertSucceeds(ref.doc("_tally").set({
      parentExercise_count: 7,
    })));
  });
  // This test passing is equivalent to a batch write failing
  test.only("deny our user to create a parentExercise if tally does not increment by 1", async () => {
    const ref = db.collection("users").doc(mockUser.uid)
                  .collection("parentExercises");
    expect(await assertFails(ref.doc("_tally").set({
      parentExercise_count: 5,
    })));
    expect(await assertFails(ref.doc("_tally").set({
      parentExercise_count: 6,
    })));
    expect(await assertFails(ref.doc("_tally").set({
      parentExercise_count: 8,
    })));
  });
  //================================================================================
});
