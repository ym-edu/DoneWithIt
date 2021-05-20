import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { useIcon } from '../layout';
import { FontAwesome } from '@expo/vector-icons';

function ExerciseOptions({setState, parent}) {
  const Icon = useIcon();

  function Buttons() {
    return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{flex: 1}}
      onPress={() => setState(false)}>
        <Icon
        name="close"
        size={20}
        color={'white'}/>
      </TouchableOpacity>
        {/* <Spacer mH={32} /> */}
      <View style={styles.buttons}>
        <TouchableOpacity
        style={{backgroundColor: '#1D1E1E', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}
        // onPress={() => setState(false)}
        >
          <FontAwesome name="history" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
        // onPress={() => setState(false)}
        >
          <Icon
          name="edit-page"
          size={20}
          color={'white'}
          style={{backgroundColor: '#1D1E1E'}}/>
        </TouchableOpacity>

        <TouchableOpacity
        // onPress={() => setState(false)}
        >
          <Icon
          name="layer-minus"
          size={20}
          color={'white'}
          style={{backgroundColor: '#1D1E1E'}}/>
          </TouchableOpacity>
      </View>
    </View>
    )
  }
  
  function SetMode() {
    return (
      <View style={styles.setMode}>
        <Text style={styles.text}>set mode</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Buttons />
      {parent ? null : <SetMode/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '75%',
    height: 72,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    position: 'absolute',
    backgroundColor: '#171818',
    // backgroundColor: 'red',
    zIndex: 99,
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
    flex: 2,
  },
  setMode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text : {
    color: '#C0C0B87F',
    fontWeight: '700',
  }
})

export default ExerciseOptions;
