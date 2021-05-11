import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function TextButton({children, onPress, style, color='white', disabled = false}) {
  return (
    <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={ style ? style : {flexDirection: 'row', alignSelf: 'center', margin: 0}}>
      <Button mode={'text'} compact={true} color={disabled ? 'gray' : color}>
        {children}
      </ Button>
    </TouchableOpacity>
  );
}

export default TextButton;
