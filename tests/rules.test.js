import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { setup, teardown } from './helpers';

const myId = "valid-user";
const theirId = "invalid-user";

const mockUser = {
  uid: myId,
  email: "example@email.com",
};

// Each key represents a path in the database - "COLLECTION/DOC": {DATA_PAYLOAD}
const mockData = {
  [`users/${mockUser.uid}`]: {
    userName: 'Test User',
  },
  [`users/${mockUser.uid}/parentExercises/exercise-1`]: {
    exerciseName: 'Exercise One',
  },
};

describe('Security Rules', () => {
  let db, udb; // db for authorized requests (i.e. logged in user), otherwise udb

  // Applies only to tests in this describe block
  beforeAll(async () => {
    ({ db, udb } = await setup(mockUser, mockData));
  });

  afterAll(async () => {
    await teardown();
  });

  test.todo("FOLLOW CONVENTION: deny/allow (who) read/write to (where)");

  test.only("deny unauthorized users read/write to any collection", async () => {
    const usersRef = udb.collection("users");

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
});