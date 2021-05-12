import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Media from './Media';
import Details from './Details';
import Spacer from './Spacer';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function ExerciseCard({id='', url='', title = '', subtitle = '', onPress = () => null, disabled = true, now}) {
  const [selected, setSelected] = useState(null);

  const handlePress = () => {
    // console.log(now)
    setSelected(!selected)
    if(now.includes(id)) {
      const array = [...now]
      const index = array.indexOf(id)
      if (index !== -1) {
        array.splice(index, 1);
        onPress(array)
      }
    } else {
      onPress([...now, id])
    }
  }
  
  return (
    <TouchableWithoutFeedback
    style={{borderRadius: 8}}
    onPress={() => {
      handlePress()
    }}
    disabled={disabled}>
      <View style={[styles.container, selected && {backgroundColor: '#242626'}]}>
        <Media source={url}/>
        <Spacer mH={8}/>
        <Details title={title} subtitle={subtitle}/>
        <Spacer mH={8}/>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
        </TouchableOpacity>
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
