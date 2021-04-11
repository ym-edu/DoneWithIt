import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Media from './Media';
import Details from './Details';
import Spacer from './Spacer';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function ExerciseCard({url='', title = '', subtitle = '', onPress = () => null}) {
  return (
    // <TouchableOpacity style={{borderRadius: 8}} onPress={onPress}>
      <View style={styles.container}>
        <Media source={url}/>
        <Spacer mH={8}/>
        <Details title={title} subTitle={subtitle}/>
        <Spacer mH={8}/>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>
    // </TouchableOpacity>
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
