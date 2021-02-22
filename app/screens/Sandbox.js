import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ConfigContext } from '../layout/Layout'

function Sandbox() {
  const Icon = useContext(ConfigContext);

  return (
    <>
      <Icon name='close' size={64} color='white' container={1}/>
      <Icon name='angle' size={16} color='pink' container={0}/>
    </>
  );
}

const styles = StyleSheet.create({
})

export default Sandbox;
