import React from 'react';
import { View, Button } from 'react-native';

function Alert({ navigation }) {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: 'white'}}>
          <Button title={'ok'} onPress={() => navigation.pop()}/>
          <Button title={'dismiss'} onPress={() => navigation.pop()}/>
        </View>
      </View>
    </>
  );
}

export default Alert;
