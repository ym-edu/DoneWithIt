import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';

import { Thumbnail, Pressables, TextDescription } from './index'

function Card({media, title, subtitle, colors, liked, onPress}) {
  const [like, setLike] = useState(liked)
  console.log('Card' ,like)

  const handleLike = () => {
    setLike(!like);
  }

  useEffect(() => {
    setLike(liked)
  }, [title])

  const handleOptions = () => console.log('Open options')

  return (
    <TouchableHighlight style={{borderRadius: 8}}
    onPress={onPress}
    underlayColor={colors.primaryLighter}
    >
      <View style={styles(colors).card}>
        <View style={{aspectRatio: 16 /9}}>
          <Thumbnail media={media} />
        </View>

        <View style={{flex: 1,}}>
          <TextDescription title={title} subtitle={subtitle} colors={colors}/>
        </View>

        <View>
          <Pressables onPress={{like: handleLike, options: handleOptions}} colors={colors} like={like}/>
        </View>
      </View>
    </TouchableHighlight>
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