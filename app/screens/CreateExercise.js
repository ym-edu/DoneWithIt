import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton'
import { useSearch, useSearchUpdate } from '../hooks/useSearch'
import SetVideo from '../components/SetVideo'

function CreateExercise({ navigation }) {
  const { videoId } = useSearch();
  const { clearState } = useSearchUpdate();
  // console.log("WTF",videoId && <SetVideo url={videoId}/>) //BUGGY

// onPress={() => navigation.navigate("Search")}
  return (
    <>
      <SetVideo/>
      <View style={styles.footer}>
        <Spacer mV={16} style={styles.line}/>
        <View style={styles.buttons}>
          <TextButton onPress={() => {
            clearState()
            navigation.pop()
          }}>Cancel
          </TextButton>
          <TextButton onPress={() => navigation.pop()}>Create</TextButton>
        </View>
        <Spacer mV={16}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  url: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  }
})

export default CreateExercise;
