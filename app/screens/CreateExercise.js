/**Security Rules Requirements ✅
 * set() -create- @ parentExercises | allow create: if isOwner
 * set() -create,update- @ parentExercises/_tally | allow create/update: if incrementsByOne
*/
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

import { useDB } from '../hooks/useDB';

function CreateExercise({ navigation }) {
  const { db, parentExercises, increment } = useDB();

  const keyboard = useKeyboard()
  
  const { exerciseName, videoId, scrollEnabled, values } = useLoop()
  const { setExerciseName, clearLoopState } = useLoopUpdate()

  const handleAdd = () => {
    const newRef = parentExercises.ref.doc();
    const batch = db().batch(); //Must assign to new batch every function call, otherwise it is mistaken for the previously commited batch.

    batch.set(newRef, {
      children_count: 0,
      exerciseName: exerciseName,
      exerciseName_std: exerciseName.toLowerCase(),
      video: {
        endTimeSec: values[1],
        startTimeSec: values[0],
        url: videoId
      },
    });
    batch.set(parentExercises.tally, { parentExercise_count: increment }, { merge: true })
    batch.commit().then(() => {
      clearLoopState()
    });
  }
  
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
          <TextButton
          disabled={(values.length > 0 && videoId && exerciseName) ? false : true }
          onPress={() => {
            handleAdd()
            navigation.pop()
          }}>Create</TextButton>
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
          <TextInput getValue={setExerciseName} label="Exercise name" focus={false}></TextInput>
        </View>
        {videoId
        ? null
        : <>
          <Spacer mV={'50%'}/>
          <Text style={styles.sectionTitle}>Find a video for your exercise</Text>
          <Spacer mV={32}/>
          <TextButton style={styles.searchButton} color='black' onPress={() => navigation.navigate("Search")}>Search</TextButton>
        </>}
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
