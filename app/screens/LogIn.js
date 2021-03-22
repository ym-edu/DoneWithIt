import React from 'react';
import { Button } from 'react-native';

function LogIn({ navigation }) {
  return (
    <>
      <Button title="Log In" onPress={() => alert("TODO")} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Forgot Password?" onPress={() => navigation.navigate("ResetPassword")} />
    </>
  );
}

export default LogIn;