import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Item from '../components/Item/Item';
import TitleText from '../components/TitleText';
import Container from '../components/Layout/Container';
import { ConfigConsumer } from '../config/configContext';

function Sandbox() {
  return (
    <ConfigConsumer>
      {({colors, sizes}) => {
      return <Text style={{color: colors.secondary}}>{sizes.fullWidth}</Text>
      }}
    </ConfigConsumer>
  );
}


const styles = () => StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
})

export default Sandbox;