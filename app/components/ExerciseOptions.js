import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { useIcon } from '../layout';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from './Spacer';
import { useDB } from '../hooks/useDB';
import { useNavigation } from '@react-navigation/native';
import { useLoopUpdate } from '../hooks/useLoop';

import { useRoutineStore } from '../hooks/useRoutineStore';

function ExerciseOptions({parent, index, data}) {
  const routineStore = useRoutineStore();
  const { routineId } = routineStore;

  const { setData } = useLoopUpdate()
  const navigation = useNavigation();
  const {db, parentExercises, workouts, decrement } = useDB()

  const handleDropDownChange = (value) => {
    // console.log("WTF", value)
    workouts.ref.doc(routineId).collection("childExercises").doc(data.id)
    .update({
      "mode.current": value,
    })
    // .then(() => console.log("Updated"))
  };

  const handleDeleteParent = () => {
    // console.log("Parent Id: ", data.id)
    const batch = db().batch();
    const ref = parentExercises.ref.doc(data.id)
    const tally = parentExercises.tally

    batch.delete(ref)
    batch.update(tally, {
      parentExercise_count: decrement,
    });

    batch.commit();
    // .then(() => console.log("Deleted Parent"))
    //TODO: Warning/Confirmation: 'All of your history for this exercise will be deleted' ...
  }

  const handleDeleteChild = () => {
    // console.log("Child Id: ", data.id)
    const batch = db().batch();
    const ref = workouts.ref.doc(routineId).collection("childExercises").doc(data.id)
    const tally = workouts.ref.doc(routineId)
    .collection("childExercises").doc("_tally")

    batch.delete(ref)
    batch.update(tally, {
      childExercise_count: decrement,
    });

    batch.commit();
    // .then(() => console.log("Deleted Child"))
  }

  const handleUpdateParent = () => {
    // console.log("EditPressed")
    navigation.navigate("ParentExerciseUpdate", {exercise: data});
    setData(data)
  }

  const handleUpdateChild = () => {
    // console.log("EditPressed")
    navigation.navigate("ChildExerciseUpdate", {exercise: data, workoutId: routineId})
  }

  const Icon = useIcon();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(!parent && data.mode.current);
  const [items, setItems] = useState([
    {label: 'fixed reps', value: 'repsFixed'},
    {label: 'reps to failure', value: 'repsTarget'},
    {label: 'fixed time', value: 'timeFixed'},
    {label: 'time to failure', value: 'timeTarget'},
  ]);

  function Buttons() {
    return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => routineStore.closeMenu(index)}
      >
        <Icon name="close" size={20} color={'white'}/>
      </TouchableOpacity>


      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(parent){

            } else {}
          }}
        >
          <FontAwesome name="history" size={20} color="white" />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            if(parent){
              null
              handleUpdateParent();
            } else {handleUpdateChild();}
          }}
        >
          <Icon name="edit-page" size={20} color={'white'} fill={true}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if(parent){
              handleDeleteParent()
            } else {handleDeleteChild()}
          }}
        >
          <Icon name="layer-minus" size={20} color={'white'} fill={true}/>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
  
  function Picker() {
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>set mode</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(newValue) => {
            setValue(newValue)
            handleDropDownChange(newValue())
          }}
          setItems={setItems}

          containerStyle={{flex: 2}}
          style={styles.picker}
          showArrowIcon={false}

          placeholder={"select a mode"}
          placeholderStyle={{color: '#C0C0B87F'}}
          
          dropDownContainerStyle={[
            styles.dropdown,
            // index === last && styles.dropdownExpand,
          ]}

          listItemContainerStyle={styles.dropdownItem}
          textStyle={[{color: 'white', textAlign: 'center'}]}
          showTickIcon={false}

          onOpen={() => {
            // if(index === last) {
              // console.log("index: ", index, "last: ", last)
            // }
          }}
          closeAfterSelecting={true}

          listMode={"FLATLIST"}
          dropDownDirection={"BOTTOM"}
        />
      </View>
    )
  }

  return (
    <View
    style={[
      styles.childCard,
      parent && styles.parentCard,
      // index === last && { borderWidth: 1, borderRadius: 8, borderColor: 'white'}
    ]}>
      <Buttons />
      <Spacer mV={4}/>
      {!parent && <Picker/>}
    </View>
  );
}

const styles = StyleSheet.create({
  childCard: {
    width: '75%',
    minHeight: 72,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#171818',
    // backgroundColor: '#242626',
    // backgroundColor: '#1D1E1E',

    // // overflow: 'hidden',
    position: 'absolute',

    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  parentCard: {
    position: 'absolute',
    minHeight: 54,
    borderRadius: 4,
    zIndex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'white',
  },
  // button: {
  //   width: 40,
  //   height: 40,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  //   backgroundColor: '#1D1E1E',
  // },
  pickerContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  label : {
    flex: 1,
    alignSelf: 'stretch', //Keep postion Top:0 when container expands
    textAlign: 'center',
    fontWeight: '700',
    color: '#C0C0B87F',
  },
  picker: {
    height: 20,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: '#1D1E1E',
  },
  dropdown: {
    maxHeight: null,
    // position: 'absolute',

    borderWidth: 0,
    backgroundColor: '#242626',
  },
  // dropdownExpand: {
  //   position: 'relative',
  //   top: 0,
  // },
  dropdownItem: {
    height: 32,
    borderWidth: .5,
  },
})

export default ExerciseOptions;
