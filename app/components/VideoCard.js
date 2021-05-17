import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Media from './Media';
import Details from './Details'
import Spacer from './Spacer';

function VideoCard({thumbnail, title, subtitle, onPress}) {
  return (
    <TouchableOpacity
    style={{borderRadius: 8}}
    onPress={onPress}
    >
      <View style={styles.container}>
        <Media directSource={thumbnail}/>
      </View>
      <Spacer mV={8}/>
      <Details
      title={title}
      subTitle={subtitle}
      />
      <Spacer mV={8}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16/9,
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

export default VideoCard;
