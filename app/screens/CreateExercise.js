import React from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { StyleSheet, View, ScrollView, Platform, Text } from 'react-native';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import { useLoop, useLoopUpdate } from '../hooks/useLoop';
import SetVideo from '../components/SetVideo';
import Slider from '../components/Slider';
import TextInput from '../components/TextInput';
import sizes from '../config/constants/sizes';
import Grid from '../components/Grid';

function CreateExercise({ navigation }) {
  const keyboard = useKeyboard()
  
  const { videoId, scrollEnabled } = useLoop()
  const { clearLoopState } = useLoopUpdate()
  
  function Footer() {
    return(
      <View style={styles.footer}>
        <Spacer mV={2} style={styles.line}/>
        <View style={styles.buttons}>
          <TextButton onPress={() => {
            clearLoopState()
            navigation.pop()
          }}>Cancel
          </TextButton>
          <TextButton onPress={() => navigation.pop()}>Create</TextButton>
        </View>
      </View>
    )
  }

  return (
    <>
    
      <View style={[
        styles.container,
        keyboard.keyboardShown
        ? Platform.OS === 'ios' 
          ? {height: sizes.screenHeight - keyboard.keyboardHeight - 16}
          : {height: sizes.windowHeight - keyboard.keyboardHeight - 16}
        : Platform.OS === 'ios' && {height: '100%'},
        ]}>
        {videoId
        ? <SetVideo url={videoId} navigation={navigation}/>
        : null}
        <ScrollView
         scrollEnabled={scrollEnabled.current}
         alwaysBounceVertical={false}
         >
        {videoId
        ? <Slider/>
        : null}
        {/* <Text style={{fontSize: 100}}>ok</Text> */}
        <View style={{paddingHorizontal: 16, marginBottom: 8}}>
          <TextInput label="Exercise name" focus={false}></TextInput>
        </View>
        {videoId
        ? null
        : <>
          <Spacer mV={'50%'}/>
          <Text style={styles.sectionTitle}>Find a video for your exercise</Text>
          <Spacer mV={32}/>
          <TextButton style={styles.searchButton} color='black' onPress={() => navigation.navigate("Search")}>Search</TextButton>
        </>}
        {/* <Grid/> */}
        </ScrollView>
        {!keyboard.keyboardShown && <Footer/>}
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
  footer: {
    backgroundColor: '#1D1E1E',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 8
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
    color: 'black',
    borderRadius: 24,
  }
})

export default CreateExercise;
