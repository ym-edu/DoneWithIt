import React, { useContext } from 'react';
import { Alert } from 'react-native';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const getAuth = {
    loading: isLoading,
    user: userToken,
  }

  const setAuth = React.useMemo(() => {
    return {
      load: () => {
        // setIsLoading(!isLoading);
        setIsLoading(false);
      },
      logIn: () => {
        setIsLoading(false);
        setUserToken('user-2'); //TEMP //TODO: Set up user authentication
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('user-2'); //TEMP //TODO: Set up user authentication
      },
      logOut: () => {
        setIsLoading(true);
        setUserToken(null);
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
