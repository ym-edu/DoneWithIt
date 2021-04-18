import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from './useAuth';

const FirestoreContext = React.createContext();
const FirestoreUpdateContext = React.createContext();

export function useDB() {
  return useContext(FirestoreContext);
}

export function useDBUpdate() {
  return useContext(FirestoreUpdateContext);
}

export default function DBProvider({ children }) {
  const { user } = useAuth()

  const getDB = {
    userRef: firestore().collection("users").doc(user),
  }

  const setDB = React.useMemo(() => {
    return {
      nothing: () => null,
    }
  }, []);

  return (
    <FirestoreContext.Provider value={getDB}>
      <FirestoreUpdateContext.Provider value={setDB}>
        {children}
      </FirestoreUpdateContext.Provider>
    </FirestoreContext.Provider>
  )
}