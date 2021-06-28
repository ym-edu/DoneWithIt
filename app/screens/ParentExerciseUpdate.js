/**Security Rules Requirements ✅
 * update() -update- @ parentExercises | allow update: if isOwner
 * TODO: consider implementing type validation
*/
import React from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import { useLoop, useLoopUpdate } from '../hooks/useLoop';
import SetVideo from '../components/SetVideo';
import Slider from '../components/Slider';
import TextInput from '../components/TextInput';
import sizes from '../config/constants/sizes';

import { useDB } from '../hooks/useDB';
import { useEffect } from 'react/cjs/react.development';

function CreateExercise({ navigation, route: {params: {exercise}}}) {
  const { parentExercises } = useDB();

  const keyboard = useKeyboard()
  
  const { exerciseName, videoId, scrollEnabled, values, data } = useLoop()
  const { setExerciseName, clearLoopState, setVideoId } = useLoopUpdate()

  const handleUpdate = () => {
    parentExercises.ref.doc(exercise.id)
    .update({
      "exerciseName": exerciseName,
      "exerciseName_std": exerciseName.toLowerCase(),
      "video.endTimeSec": values[1],
      "video.startTimeSec": values[0],
      "video.url": videoId,
    })
    .then(() => clearLoopState()) //TODO: Cloud Function to update children
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
          disabled={(
            //This really isn't necessary as firestore will not rewrite any fields that have not been updated. Regardless, it works and looks nice.
            values[0] !== exercise.video.startTimeSec ||
            values[1] !== exercise.video.endTimeSec ||
            videoId !== exercise.video.url ||
            exerciseName !== exercise.name
            ) ? false : true }
          onPress={() => {
            handleUpdate()
            navigation.pop()
          }}>Save</TextButton>
        </View>
      </View>
    )
  }

  useEffect(() => {
    setVideoId(data.video.url)
    setExerciseName(data.name)
  }, [])

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
          ? <>
              <Slider/>
              <View style={{paddingHorizontal: 16, marginBottom: 8}}>
                <TextInput getValue={setExerciseName} value={exerciseName} label="Exercise name" focus={false}></TextInput>
              </View>
            </>
          : null}
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
