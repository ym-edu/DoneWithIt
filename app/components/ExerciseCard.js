import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Media from './Media';
import Details from './Details';
import Spacer from './Spacer';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function ExerciseCard({
  url='', title = '', subtitle = '',
  /** mode defaults
   * 'list' | disabled: true, selected: (not selectable), hasOptions: true
   * 'sortableList' | disabled: true, selected: (selectable),  hasOptions: false
   * 'selectableList' | disabled: false, selected: (selectable), hasOptions: false
   */
  mode = 'list',
  state = null,
  data = null,
  onPress = () => null,
}) {
  const [disabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState(false);
  const [hasOptions, setHasOptions] = useState(true);

  useEffect(() => {
    if(mode === 'sortableList') {
      setHasOptions(false)
    } else if(mode === 'selectableList') {
      setDisabled(false)
      setHasOptions(false)
    }
  }, [])

  const handlePress = () => {
    setSelected(!selected)
  }

  // const handlePress = () => {
  //   setSelected(!selected)

  //   if(state.includes(data)) {
  //     const array = [...state]
  //     const index = array.indexOf(data)
  //     if (index !== -1) {
  //       array.splice(index, 1);
  //       onPress(array)
  //     }
  //   } else {
  //     onPress([...state, data])
  //   }
  // }
  
  return (
    <TouchableWithoutFeedback
    style={{borderRadius: 8}}
    onPress={() => handlePress()}
    disabled={disabled}>

      <View style={[
        styles.container,
        selected && {backgroundColor: '#242626'},
        mode != 'list' && {height: 54}
        ]}>
        <Media source={url}/>
        <Spacer mH={8}/>
        <Details title={title} subtitle={subtitle}/>
        <Spacer mH={8}/>
        {hasOptions 
        ? <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
          </TouchableOpacity>
        : null}
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

export default ExerciseCard;
