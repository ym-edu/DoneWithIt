import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function TextButton({children, onPress}) {
  return (
    <TouchableOpacity>
      <Button mode={'text'} color={'white'} onPress={onPress}>
        {children}
      </ Button>
    </TouchableOpacity>
  );
}

export default TextButton;
