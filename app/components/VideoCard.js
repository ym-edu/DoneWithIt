import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Media from './Media';
import Details from './Details'

function VideoCard({thumbnail, title, subtitle, onPress}) {
  return (
    <TouchableOpacity
    style={{borderRadius: 8}}
    onPress={onPress}
    >
      <View style={styles.container}>
        <Media directSource={thumbnail}/>
      </View>
      <View style={{height: 72, width: '100%'}}>
        <Details
        title={title}
        subTitle={subtitle}
        />
      </View>
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
