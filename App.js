import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {
  const { landscape } = useDeviceOrientation();

  return (
    <View style={styles({color: "dodgerblue"}).container}>
      <View style={styles({color: "gold", align: "flex-start"}).section}/>
      <View style={styles({color: "silver"}).section}/>
      <View style={styles({color: "tomato"}).section}/>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    alignSelf: props.align,
    width: 100,
    height: 100,
    backgroundColor: props.color,
  }
});
