import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import TextButton from '../components/TextButton';
import Spacer from '../components/Spacer';

function Alert({navigation}) {

  function ConfirmDeleteBox() {
    return(
      <View style={[styles.modal, {borderColor: '#C8C0B8F7', padding: 16, width: '100%'}]}>
      <Text style={styles.title}>Email has been sent!</Text>
      <Spacer mV={8} />
      <Text style={[styles.title, {fontSize: 16, fontWeight: 'normal'}]}>
      Check your inbox and click on the link to reset your password
      </Text>
      <Spacer mV={16} />
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <TextButton onPress={() => {
          navigation.pop()
          navigation.replace("LogIn")
        }}>
          GOT IT
        </TextButton>
      </View>
    </View>
  )
  }

  return (
    <>
      <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigation.replace("LogIn")}
      >
        <ConfirmDeleteBox/>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modal: {
    // padding: 16,
    backgroundColor: '#242626',
    width: '75%',
    // borderRadius: 2,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
    position: 'absolute',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center'
  },
  button: {
    flex: 1,
    borderWidth: .25,
    borderColor: '#C8C0B8F7',
    padding: 2,
  }
})

export default Alert;
