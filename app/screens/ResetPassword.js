import React from 'react';
import { Button } from 'react-native';

function ResetPassword({ navigation }) {
  return (
    <>
      <Button title="Reset Password" onPress={() => navigation.pop()} />
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </>
  );
}

export default ResetPassword;