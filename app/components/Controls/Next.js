import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useIcon } from '../../layout'


function Next({onPress, woEnding}) {
  const Icon = useIcon();

  return (
    <TouchableOpacity style = {styles.container}
    onPress={onPress}
    disabled={woEnding}>
      <Icon name='angle' size={32} color={woEnding ? '#383B3B' : 'white'}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    transform: [{rotateY: '180deg'}],
  },
})

export default Next;