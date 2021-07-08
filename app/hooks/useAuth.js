import React, { useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthErrors from '../config/constants/authErrors';

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

  const setAuth = React.useMemo(() => {
    return {
      load: () => {
        // setIsLoading(!isLoading);
        setInitializing(false);
      },
      logIn: async ({email, password}, setErrors) => {
        // setUser('user-2'); //TEMP //TODO: Set up user authentication

        try {
          await auth().signInWithEmailAndPassword(email, password)
        } catch(error) {
          console.log(error)
          // console.log(AuthErrors[error.code])
          setErrors({ db: AuthErrors[error.code] })
        }
      },
      signUp: async ({email, password, userName}, setErrors) => {
        // setUser('user-2'); //TEMP //TODO: Set up user authentication

        try {
          console.log("Creating your account ...")
          await auth().createUserWithEmailAndPassword(email, password)
          .then(token => {
            // console.log("TOKEN: ", token.user.uid)
            firestore().collection("users").doc(token.user.uid).set({
              // userName,
              // userName_std: userName.toLowerCase(),
              email,
            })
          })
        } catch (error) {
          console.log(error)
          setErrors({ db: AuthErrors[error.code] })
        }
      },
      logOut: async () => {
        try {
          await auth().signOut()
        } catch (error) {
          console.log(error)
        }
      },
      resetPassword: async ({email}, setErrors, navigation) => {
        try {
          console.log("Check your email")
          await auth().sendPasswordResetEmail(email)
          .then(() => {
            navigation.navigate("ResetPasswordAlert")
          })
        } catch (error) {
          console.log(error)
          setErrors({ db: AuthErrors[error.code] })
        }
      }
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
