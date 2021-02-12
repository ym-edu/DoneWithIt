import React from 'react';
import Colors from '../config/colors'

import { Platform, StatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';
// import Logo from '../assets/Logo.svg'

function WelcomeScreen() {
  return (
    <SafeAreaView style={styles().screen}>
      <View style={styles().logoContainer}>
          {/* <Logo width={"100em"} height={"130em"} /> 
          // Loading problem with metro config file.
          // Using the file renders svgs but breaks icon fonts
          // Not using file renders correct icons but breaks svgs*/}
          
          <Text style={styles().title}>Rootine</Text>
      </View>
      <View style={styles({color: Colors.highlight}).button} />
      <View style={styles({color: Colors.secondaryDarker}).button} />
    </SafeAreaView>
  );
}

const styles = (props) => StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    backgroundColor: Colors.primaryDarker,
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
    backgroundColor: props ? props.color : Colors.primaryDarker,
    width: '100%',
    height: 50,
  },
})

export default WelcomeScreen;