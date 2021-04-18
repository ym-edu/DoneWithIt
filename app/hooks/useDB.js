import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from './useAuth';

const DBContext = React.createContext();

export function useDB() {
  return useContext(DBContext);
}

export default function DBProvider({ children }) {
  const { user } = useAuth()
  const userRef = firestore().collection("users").doc(user)

  return (
    <DBContext.Provider value={userRef}>
        {children}
    </DBContext.Provider>
  )
}
