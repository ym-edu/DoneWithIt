import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Media from './Media'
import Details from './Details'
import Spacer from './Spacer'

function WorkoutCard({data}) {
  return (
    <TouchableOpacity style={{borderRadius: 8}} onPress={null}>
      <View style={styles.container}>
        <Media source={data} square={true}/>
        <Spacer mH={8}/>
        <Details title='my exercises' subTitle='100 exercises'/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'pink',
    width: '100%',
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spacer: {
    marginLeft: 16,
  }
})

export default WorkoutCard;
