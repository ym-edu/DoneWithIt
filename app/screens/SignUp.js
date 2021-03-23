import React from 'react';
import { Button } from 'react-native';

import { useAuthUpdate } from '../hooks/useAuth'

function SignUp({ navigation }) {
  const { signUp } = useAuthUpdate();

  return (
    <>
      <Button title="Sign Up" onPress={() => signUp()} />
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </>
  );
}

export default SignUp;
