import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Media from './Media';
import Details from './Details';
import Spacer from './Spacer';
import Options from './Options';
import ExerciseOptions from './ExerciseOptions';

function ExerciseCard({
  url='', title = '', subtitle = '',
  /** types
   * parentExercise
   * childExercise
   * nextExercise
   * selectable
   * sortable
   */
  data = null, // [(exerciseId) exerciseMode]
  
  selection = null, //selection
  setSelection = null, //setSelection
  
  onLongPress = null,
  isActive = null,
  
  index,
  
  isMenuOpen = false,
  handleMenuState,
  workoutId,
  
  variant,
  style,
  completed = false,
}) {
  const [selected, setSelected] = useState(false);
  const [hasOptions, setHasOptions] = useState(true);

  useEffect(() => {
    if(variant === 'sortable') {
      setHasOptions(false)
    } else if(variant === 'selectable') {
      setHasOptions(false)
    }
  }, [])

  const handlePress = () => {
    setSelected(!selected)

    if(selection.includes(data.id)) { //To avoid pushing to array when deselecting an item
      const array = [...selection]
      const index = array.indexOf(data.id)

      if (index !== -1) {
        array.splice(index, 1);

        setSelection(array)
      }
    } else {
      setSelection([...selection, data.id])
    }
  }
  
  return (
    <>
    <View style={variant === 'sortable' && styles.sortableList}>
      {variant === 'sortable'
      ? <TouchableOpacity
          style={{padding: 8}}
          onLongPress={onLongPress}
          delayLongPress={0}
        >
          <FontAwesome5 name="grip-lines" size={16} color="white" />
        </TouchableOpacity>
      : null}



      <TouchableWithoutFeedback
        disabled={variant !== 'selectable'}
        style={{borderRadius: 8}}
        onPress={() => variant !== 'sortable' ? handlePress() : null}
      >

        <View style={[
          //childExercise
          styles.container,
          //parentExercise || selectable || sortable
          (variant === 'parentExercise' || variant === 'selectable' || variant === 'sortable') && {height: 54, marginBottom: 12},
          //selectable || sortable
          (selected || isActive) && {backgroundColor: '#242626'},
          //sortable
          isActive && {minHeight: 63},
          //nextExercise
          variant === 'nextExercise' && style,
          variant === 'stats'
          ? completed ? styles.complete : styles.incomplete
          : null
        ]}>
          <Media source={url}/>
          <Spacer mH={8}/>
          <Details title={title} subtitle={subtitle}/>
          <Spacer mH={8}/>
          {variant === 'parentExercise' || variant === 'childExercise'
          ? <Options onPress={() => {handleMenuState(index, true)}}/> //Open menu
          : null}
        </View>

      </TouchableWithoutFeedback>
      


      {isMenuOpen[index]
      ? <ExerciseOptions 
          variant={variant} //Show pickerLayer
          data={data} //Pass item Mode to picker
          index={index} //Get cell index
          handleMenuState={handleMenuState} // Set isMenuOpen state to false
          workoutId={workoutId}
        />
      : null}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderRadius: 8,

    marginBottom: 12,
  },
  sortableList: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  complete: {
    borderWidth: 1,
    borderColor: '#2fcfaf',
  },
  incomplete: {
    borderWidth: 1,
    borderColor: '#D03050',
  },
})

export default ExerciseCard;
