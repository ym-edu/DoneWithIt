import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useIcon } from '../../layout'


function Reset({onPress, exStarting}) {
  const Icon = useIcon();

  return (
    <TouchableOpacity style={styles.container}
    onPress={onPress}
    disabled={exStarting}>
      <Icon name='close' color={exStarting ? '#383B3B' : 'white'}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 16,
  },
})

export default Reset;