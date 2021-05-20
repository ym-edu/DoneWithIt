import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform} from 'react-native';
import { useIcon } from '../layout';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

function ExerciseOptions({setState, parent}) {
  const Icon = useIcon();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'reps fixed', value: 'repsFixex'},
    {label: 'reps target', value: 'repsTarget'},
    {label: 'time Fixed', value: 'timeFixed'},
    {label: 'time target', value: 'timeTarget'},
  ]);

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
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropDownSelector}
          containerStyle={{flex: 2}}
          textStyle={[{color: 'white', textAlign: 'center'}]}
          placeholder={"select a mode"}
          placeholderStyle={{color: '#C0C0B87F'}}
          showArrowIcon={false}
          dropDownContainerStyle={{backgroundColor: '#242626'}}
          closeAfterSelecting={true}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, parent && { justifyContent: 'center' }]}>
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
    // overflow: 'hidden',
    alignSelf: 'flex-end',
    position: 'absolute',
    backgroundColor: '#171818',
    // backgroundColor: 'red',
    zIndex: 1,
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
    maxHeight: 30,
  },
  text : {
    flex: 1,
    color: '#C0C0B87F',
    fontWeight: '700',
  },
  dropDownSelector: {
    backgroundColor: '#1D1E1E',
    padding: 0,
    margin: 0,
    maxHeight: 20,
    borderRadius: 2,
    borderWidth: 0,
  },
})

export default ExerciseOptions;
