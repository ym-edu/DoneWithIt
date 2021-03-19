import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useIcon } from '../layout'
import Spacer from '../components/Spacer'

function CreateButton({icon, title}) {
  const Icon = useIcon()

  return (
    <View style={styles.container}>
      <Icon name={icon} container={true} style={{borderRadius: 4}}/>
      <Spacer mH={8}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32, 
    width: '100%', 
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