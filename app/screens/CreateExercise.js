import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import { useLoop, useLoopUpdate } from '../hooks/useLoop';
import SetVideo from '../components/SetVideo';
import Slider from '../components/Slider';
import TextInput from '../components/TextInput';
import sizes from '../config/constants/sizes';

function CreateExercise({ navigation }) {
  const { videoId, scrollEnabled, keyboardVisible } = useLoop()
  const { clearLoopState } = useLoopUpdate()

  function Footer() {
    return(
      <View style={styles.footer}>
        <Spacer mV={4} style={styles.line}/>
        <View style={styles.buttons}>
          <TextButton onPress={() => {
            clearLoopState()
            navigation.pop()
          }}>Cancel
          </TextButton>
          <TextButton onPress={() => navigation.pop()}>Create</TextButton>
        </View>
        <Spacer mV={4}/>
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        {videoId
        ? <SetVideo url={videoId} navigation={navigation}/>
        : null}
        <ScrollView
         style={styles.scroll}
         scrollEnabled={scrollEnabled.current}
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
        : <TextButton onPress={() => navigation.navigate("Search")}>Search</TextButton>}
        </ScrollView>
        {!keyboardVisible && <Footer/>}
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: sizes.screenHeight,
    // width: sizes.screenWidth,
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
  },
  scroll: {

  }
})

export default CreateExercise;
