import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useIcon } from '../../layout'


function Previous({onPress, woStarting}) {
  const Icon = useIcon();

  return (
    <TouchableOpacity style = {styles.container}
    onPress={onPress}
    disabled={woStarting}>
      <Icon name='angle' size={32} color={woStarting ? '#383B3B' : 'white'}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
})

export default Previous;