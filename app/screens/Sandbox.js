import React, {Fragment} from 'react';
import { StyleSheet, Text } from 'react-native';
import Container from '../components/Layout/Container';
import appConstants, { sizes, colors } from '../config';

function Sandbox() {
  console.log('DEFAULT', appConstants)
  console.log('NAMED', sizes)
  // const {sizes} = appConstants; // when not imported as named import

  return (
    <Fragment>
      <Container
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        mB={sizes.spacerVertical}
        bgColor={'purple'}
        // THIS Container JUST USES flex: 1 TO FILL THE AVAILABLE SCREEN SPACE
      >
        <Text>Hello</Text>
        <Text>Hello</Text>
      </Container>


      <Container
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}
        mH={sizes.spacerHorizontal}
        bgColor={'orange'}
        // THIS Container USES sizes.spacerHorizontal TO DEFINE IT'S MARGIN *RELATIVE* TO ITS PARENT CONTAINER 
      >
        <Text>Hello</Text>
        <Text style={{backgroundColor: 'green', borderColor: 'white', borderWidth: 1}}>Hello</Text>
      </Container>


      <Container
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: sizes.fullWidth, alignSelf: 'center', flex: 0}}
        mT={sizes.spacerVertical}
        bgColor={'green'}
        // THIS Container USES width: sizes.fullWidth + alignSelf: 'center' TO FILL THE WIDTH OF ITS PARENT CONTAINER (SIMULATING IT'S PARENT[?] AS POSITION *ABSOLUTE*.)
        //
      >
        <Text>Hello</Text>
        <Text style={{backgroundColor: 'orange', borderColor: 'white', borderWidth: 1}}>Hello</Text>
      </Container>
    </Fragment>
  );
}


const styles = () => StyleSheet.create({
})

export default Sandbox;