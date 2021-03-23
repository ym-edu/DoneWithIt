import React from 'react';
import { Button } from 'react-native';

import { useAuthUpdate } from '../hooks/useAuth'

function LogIn({ navigation }) {
  const { logIn } = useAuthUpdate();

  return (
    <>
      <Button title="Log In" onPress={() => logIn()} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Forgot Password?" onPress={() => navigation.navigate("ResetPassword")} />
    </>
  );
}

export default LogIn;
