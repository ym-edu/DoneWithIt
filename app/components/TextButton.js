import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function TextButton({children, onPress, style, color='white'}) {
  return (
    <TouchableOpacity onPress={onPress} style={ style ? style : {flexDirection: 'row', alignSelf: 'center', margin: 0}}>
      <Button mode={'text'} compact={true} color={color}>
        {children}
      </ Button>
    </TouchableOpacity>
  );
}

export default TextButton;
