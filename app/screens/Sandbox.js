import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../config/colors'

function Sandbox(props) {
  return (
    <View style={styles().screen}>
      <View style={styles({width: 100}).borderBox} />
      <View style={styles({width: 50}).shadowBox} />
      <Text style={styles().textFont}>I love react, because I don't have to work twice as hard to make things on seperate platforms</Text>
      <FontAwesome name="database" size={32} color="green" />
    </View>
  );
}


const styles = (props) => StyleSheet.create({
  screen: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
    //  flexDirection: 'row',
  },
  borderBox: {
    backgroundColor: 'blue',
    width: props ? props.width : 50,
    height: props ? props.width : 50,
    borderWidth: 10,
    // borderLeftColor: Colors.white, //Causes visual error with transform (LM-X212(G))
    borderColor: "yellow", // overrides borderLeftColor
    borderRadius: props ? props.width/2 : 0,
    borderTopLeftRadius: 10,
    transform: [{rotate: '20deg'}],
  },
  shadowBox: {
    elevation: 8,
    backgroundColor: 'red',
    width: 50,
    height: 50,
    shadowColor: 'grey',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  textFont: {
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
    // [WTF] https://stackoverflow.com/questions/53329578/react-native-expo-fontfamily-simplelineicons-is-not-a-system-font-and-has-n
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold', // or '600',
    textTransform: 'capitalize',
    textDecorationLine: 'underline line-through',
    textAlign: 'justify',
    lineHeight: 32,
  }
})

export default Sandbox;