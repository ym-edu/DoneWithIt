import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Thumbnail, Pressables, TextDescription } from './index'

function Card({media, title, subtitle, colors}) {
  const handleLike = () => alert('Added to liked exercises')
  const handleOptions = () => console.log('Open options')

  return (
    <View style={styles(colors).card}>
      <View style={{aspectRatio: 16 /9}}>
        <Thumbnail media={media} />
      </View>

      <View style={{flex: 1,}}>
        <TextDescription title={title} subtitle={subtitle} colors={colors}/>
      </View>

      <View>
        <Pressables onPress={{like: handleLike, options: handleOptions}} colors={colors}/>
      </View>
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  card: {
    // backgroundColor: colors.primaryLighter,
    width: '100%',
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
})

export default Card;