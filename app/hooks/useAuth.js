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

export default function AuthProvider({ children, navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const getAuth = {
    loading: isLoading,
    user: userToken,
  }

  const setAuth = React.useMemo(() => {
    return {
      load: () => {
        setIsLoading(!isLoading);
      },
      logIn: () => {
        setIsLoading(false);
        setUserToken('TOKEN');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('TOKEN');
      },
      logOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
      resetPassword: (nav) => Alert.alert(
        "Simulating Password Reset",
        "//TODO resetPassword( )",
        [{
          text: 'Return to previous screen',
          onPress: () => nav.pop()
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
