import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// import { useIcon } from '../../layout'
import { MaterialCommunityIcons } from '@expo/vector-icons';



function Reset({onPress, exStarting}) {
  // const Icon = useIcon();

  return (
    <TouchableOpacity style={styles.container}
    onPress={onPress}
    disabled={exStarting}>
      <MaterialCommunityIcons name="reload" size={24} color={exStarting ? '#383B3B' : 'white'} />
      {/* <Icon name='close' color={exStarting ? '#383B3B' : 'white'}/> */}
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