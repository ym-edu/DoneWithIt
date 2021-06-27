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


  test.skip("deny unauthorized users to read/write to any collection", async () => {
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


  test("allow our user to read their own userDoc", async () => {
    const ref = db.collection("users").doc(mockUser.uid);
    expect(await assertSucceeds(ref.get()));
  });

  test("deny our user to read a userDoc that is not their own", async () => {
    const ref = db.collection("users").doc(otherId);
    expect(await assertFails(ref.get()));
  });
});