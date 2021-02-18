import React, {Fragment} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Container from '../components/Layout/Container';

function Sandbox() {
  return (
    <Fragment>
      <Container
        style={{backgroundColor: 'purple', flexDirection: 'row', justifyContent: 'space-between'}}
        mB={16}
      >
        <Text>Hello</Text>
        <Text>Hello</Text>
      </Container>
      <Container
        style={{backgroundColor: 'orange', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}
        mH={8}
      >
        <Text>Hello</Text>
        <Text style={{backgroundColor: 'green', borderColor: 'white', borderWidth: 1}}>Hello</Text>
      </Container>
    </Fragment>
  );
}


const styles = () => StyleSheet.create({
})

export default Sandbox;