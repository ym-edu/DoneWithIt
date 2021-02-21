import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import Item from '../components/Item/Item';
import TitleText from '../components/TitleText';
import Container from '../components/Layout/Container';
import Context from '../config/configContext'

function Sandbox() {
  const { colors } = useContext(Context)
  return (
    <Text style={{color: colors.highlight}}>Hello</Text>
  );
}


const styles = () => StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
})

export default Sandbox;