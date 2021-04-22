import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useVideoId, useVideoIdUpdate } from '../hooks/useVideoId'

function CreateExercise({ navigation }) {
  const videoId = useVideoId();
  const { clearVideoIdState } = useVideoIdUpdate();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.url} onPress={() => {
          navigation.navigate("Search")
        }}>
            {/* //TEMP: just to navigate to search screen */}
          <MaterialIcons name="search" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 32}}>Url: {videoId}</Text>
      </View>
      <View style={styles.footer}>
        <Spacer mV={16}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 32}}>
          <TextButton onPress={() => {
            clearVideoIdState()
            navigation.pop()
          }}>
            Cancel
          </TextButton>
          <TextButton onPress={() => {
            // handleAdd()
            navigation.pop()
          }}>
            Create
          </TextButton>
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
  }
})

export default CreateExercise;
