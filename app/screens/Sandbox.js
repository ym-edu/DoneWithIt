import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Item from '../components/Item/Item';
import TitleText from '../components/TitleText';
import Container from '../components/Layout/Container';
import appConstants, { sizes, colors } from '../config';

function Sandbox() {
  return (
    <>
      <Container
      style={styles().container}
      // bgColor={'white'}
      mB={sizes.spacerVertical}
      mH={sizes.spacerHorizontal}
      >
        <Item appConstants={appConstants}><TitleText>Hello</TitleText></Item>
      </Container>
      {/* ===================================================== */}
      <Container
      >
        <></>
      </Container>
    </>
  );
}


const styles = () => StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
})

export default Sandbox;