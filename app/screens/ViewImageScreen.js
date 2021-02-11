import React from 'react';
import { Image, StyleSheet, View, Platform, StatusBar, SafeAreaView } from 'react-native';

function ViewImageScreen(props) {
  return (
    <SafeAreaView style={styles().screen}>
      <Image resizeMode="cover" style={styles().image} source={require('../assets/CompletedWorkout.jpg')}/>
      <View style={{flex:1, justifyContent: 'space-around', flexDirection: 'row', marginTop: 32}}>
        <View style={styles({color: "#C8C0B8"}).button} />
        <View style={styles({color: "#D03050"}).button} />
      </View>
    </SafeAreaView>
  );
}

const styles = (props) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#171818",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    width: '100%',
    height: '50%',
  },
  button: {
    flex: 1,
    backgroundColor: props ? props.color : '#C8C0B8',
    width: '100%',
    height: 50,
    marginHorizontal: 16,
    borderRadius: 4,
  },
})

export default ViewImageScreen;