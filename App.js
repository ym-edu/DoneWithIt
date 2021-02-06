import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {
  const { landscape } = useDeviceOrientation();

  return (
    <View style={styles({color: "dodgerblue", flex: 0.75}).section}>
      <View style={styles({color: "gold", flex: 2}).section}/>
      <View style={styles({color: "silver", flex: 1}).section}/>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  section: {
    flex: props.flex,
    width: "100%",
    height: "100%",
    backgroundColor: props.color
  }
});
