import React from 'react';
import { Button } from 'react-native';

function Modal({ navigation }) {
  return (
    <>
      <Button title={'create'} onPress={() => navigation.pop()}/>
      <Button title={'cancel'} onPress={() => navigation.pop()}/>
    </>
  );
}

export default Modal;
