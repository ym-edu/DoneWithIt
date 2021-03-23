import React from 'react';
import { Button } from 'react-native';

import { useAuthUpdate } from '../hooks/useAuth'

function ResetPassword({ navigation }) {
  const { resetPassword } = useAuthUpdate();

  return (
    <>
      <Button title="Reset Password" onPress={() => resetPassword(navigation)} />
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </>
  );
}

export default ResetPassword;