import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Media from './Media'
import Details from './Details'
import Spacer from './Spacer'

function WorkoutCard({url, title='my workout', subTitle = 0, onPress}) {
  function formatSubtitle(data) {
    return `${data} exercises`
  }

  return (
    <TouchableOpacity style={{borderRadius: 8}} onPress={onPress}>
      <View style={styles.container}>
        <Media source={url} square={true}/>
        <Spacer mH={8}/>
        <Details title={title} subTitle={formatSubtitle(subTitle)}/>
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
