import React from 'react';
import { Button } from 'react-native';

function SignUp({ navigation }) {
  return (
    <>
      <Button title="Sign Up" onPress={() => alert("TODO")} />
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </>
  );
}

export default SignUp;