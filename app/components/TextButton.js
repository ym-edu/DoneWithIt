import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function TextButton({children, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignSelf: 'center'}}>
      <Button mode={'text'} compact={true} color={'white'}>
        {children}
      </ Button>
    </TouchableOpacity>
  );
}

export default TextButton;
