import React from 'react';
import { StyleSheet } from 'react-native';
import { useIcon } from '../layout';

function Sandbox() {
  const Icon = useIcon()
  return (
    <>
      <Icon name='media-empty' size={64} container={1}/>
      <Icon name='angle'/>
    </>
  );
}

const styles = StyleSheet.create({
})

export default Sandbox;
