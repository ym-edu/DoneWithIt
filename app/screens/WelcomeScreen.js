import React from 'react';
import { Platform, StatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Logo from '../assets/Logo.svg'

function WelcomeScreen() {
  return (
    <SafeAreaView style={styles().screen}>
      <View style={styles().logoContainer}>
          <Logo width={"100em"} height={"130em"} />
          <Text style={styles().title}>Rootine</Text>
      </View>
      <View style={styles({color: "#C8C0B8"}).button} />
      <View style={styles({color: "#D03050"}).button} />
    </SafeAreaView>
  );
}

const styles = (props) => StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    backgroundColor: '#171818',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: props ? props.color : '#171818',
    width: '100%',
    height: 50,
  },
})

export default WelcomeScreen;