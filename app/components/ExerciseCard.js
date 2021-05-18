import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Media from './Media';
import Details from './Details';
import Spacer from './Spacer';
import Options from './Options';

function ExerciseCard({
  url='', title = '', subtitle = '',
  /** mode defaults
   * 'list' | disabled: true, selected: (not selectable), hasOptions: true
   * 'sortableList' | disabled: true, selected: (selectable),  hasOptions: false
   * 'selectableList' | disabled: false, selected: (selectable), hasOptions: false
   */
  mode = 'list',
  data = null, // exerciseId
  state = null, //selection
  setState = null, //setSelection
  onLongPress = null,
  isActive = null,
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

    if(state.includes(data)) { //To avoid pushing to array when deselecting an item
      const array = [...state]
      const index = array.indexOf(data)

      if (index !== -1) {
        array.splice(index, 1);

        setState(array)
      }
    } else {
      setState([...state, data])
    }
  }
  
  return (
    <View style={mode === 'sortableList' && styles.sortableList}>

      {mode === 'sortableList'
      ? <TouchableOpacity
        style={{padding: 8}}
        onLongPress={onLongPress}
        delayLongPress={0}
        >
          <FontAwesome5 name="grip-lines" size={16} color="white" />
        </TouchableOpacity>
      : null}

      <TouchableWithoutFeedback
      disabled={disabled}
      style={{borderRadius: 8}}
      onPress={() => mode != 'sortableList' ? handlePress() : null}>
        <View style={[
          styles.container,
          (selected || isActive) && {backgroundColor: '#242626'},
          mode != 'list' && {height: 54},
          ]}>
          <Media source={url}/>
          <Spacer mH={8}/>
          <Details title={title} subtitle={subtitle}/>
          <Spacer mH={8}/>
          {hasOptions ? <Options /> : null}
        </View>
      </TouchableWithoutFeedback>

    </View>
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
  },
  sortableList: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
})

export default ExerciseCard;
