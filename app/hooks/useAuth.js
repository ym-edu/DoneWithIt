import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export default function AuthProvider({ children }) {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const getAuth = {
    loading: initializing,
    user: user,
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const EMAIL = 'example4@email.com'
  const PASSWORD = '123456'
  const USERNAME = 'NYM'

  const setAuth = React.useMemo(() => {
    return {
      load: () => {
        // setIsLoading(!isLoading);
        setInitializing(false);
      },
      logIn: async (email = EMAIL, password = PASSWORD) => {
        // setUser('user-2'); //TEMP //TODO: Set up user authentication

        try {
          await auth().signInWithEmailAndPassword(email, password)
        } catch(error) {
          console.log(error)
        }
      },
      signUp: async (email = EMAIL, password = PASSWORD, userName = USERNAME) => {
        // setUser('user-2'); //TEMP //TODO: Set up user authentication

        try {
          await auth().createUserWithEmailAndPassword(email, password)
          .then(token => {
            // console.log("TOKEN: ", token.user.uid)
            firestore().collection("users").doc(token.user.uid).set({
              userName,
              userName_std: userName.toLowerCase(),
            })
          })
        } catch (error) {
          console.log(error)
        }
      },
      logOut: async () => {
        try {
          await auth().signOut()
        } catch (error) {
          console.log(error)
        }
      },
      resetPassword: (navigation) => Alert.alert(
        "Simulating Password Reset",
        "//TODO resetPassword( )",
        [{
          text: 'Return to previous screen',
          onPress: () => navigation.pop()
        }],
        {cancelable: false},
      ),
    }
  }, []);

  return (
    <AuthContext.Provider value={getAuth}>
      <AuthUpdateContext.Provider value={setAuth}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  )
}
