import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useIcon } from '../layout'
import Spacer from '../components/Spacer'
// import { TouchableOpacity } from 'react-native-gesture-handler'; //WTF: somehow this makes button clickable from any screen

function CreateButton({icon, title, style, onPress}) {
  const Icon = useIcon()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Icon name={icon} fill={true} style={{borderRadius: 4}}/>
        <Spacer mH={8}/>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32, 
    // backgroundColor: 'cyan',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    justifyContent: 'center',
  },
  title:{
    color: '#E5E5E5',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 16,
  },
})

export default CreateButton;