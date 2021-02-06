import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {
  const { landscape } = useDeviceOrientation();

  return (
    <SafeAreaView style={styles().container}>
      <View style={styles(landscape).viewOne}></View>
    </SafeAreaView>
  );
}

const styles = (props) => StyleSheet.create({
  viewOne: {
    backgroundColor: 'dodgerblue',
    width: "100%",
    height: props ? "100%" : "30%",
  },
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
