import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextInput from '../components/TextInput'
import TextButton from '../components/TextButton'
import Spacer from '../components/Spacer';

function CreateWorkout({ navigation }) {
  return (
    <>
      <View style={styles.container}>

        <View style={styles.modal}>
          <Text style={styles.title}>New workout</Text>
          <Spacer mV={8} />
          <TextInput label={'Title'} focus={true} getValue={null}/>
          <Spacer mV={16} />
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton onPress={() => handleSubmit(input)}>
              Create
            </TextButton>
          </View>
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  modal: {
    padding: 16,
    backgroundColor: '#242626',
    width: '100%',
    borderRadius: 2,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
    position: 'absolute',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default CreateWorkout;
