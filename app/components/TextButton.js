import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function TextButton({children, onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={ style ? style : {flexDirection: 'row', alignSelf: 'center', margin: 0}}>
      <Button mode={'text'} compact={true} color={'white'}>
        {children}
      </ Button>
    </TouchableOpacity>
  );
}

export default TextButton;
