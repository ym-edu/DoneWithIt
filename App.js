import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {
  const { landscape } = useDeviceOrientation();

  return (
    <View style={styles({color: "dodgerblue"}).container}>
      <View style={styles({color: "gold", width: 300}).section}/>
      <View style={styles({color: "silver", position: "absolute", x: 20, y: 50}).section}/>
      <View style={styles({color: "violet"}).section}/>
      <View style={styles({color: "tomato"}).section}/>
      <View style={styles({color: "green"}).section}/>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: "wrap-reverse"
  },
  section: {
    alignSelf: props.align,
    width: 100,
    height: props.width ? props.width : 100,
    backgroundColor: props.color,
    position: props.position ? props.position : "relative",
    top: props.x ? props.x : 0,
    left: props.y ? props.y : 0,
  }
});
