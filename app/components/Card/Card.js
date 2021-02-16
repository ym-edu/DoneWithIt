import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';

import { Thumbnail, Pressables, TextDescription } from './index'

function Card({media, title, subtitle, colors, liked}) {
  const [like, setLike] = useState(liked)
  console.log('Card' ,like)

  const handleLike = () => {
    setLike(!like);
  }

  useEffect(() => {
    setLike(liked)
  }, [title])
  // When changing itemNumber from Sandbox, the liked prop being passed to card had to change, however sometimes the value coincide.
  // Therefore: if this item's liked prop was FALSE, its value was changed to TRUE by the handler.
  // And: if I changed the item from Sandbox to an item which's liked prop was TRUE, useEffect doesn't update state because the liked prop didn't seem to change (from useEffects perspective).
  // So: whenever I switched back to the previous item which was liked (through handler), it's value never reset to its original value from the data object.
  // The fix was to set useEffect to 'watch' for changes from another parameter that did not share values from the data object.
  // The chosen parameter was title.
  // Now: changing itemNumber to select the exercise resets the liked button to the value defined in 'database' (data object used to simulate a database).
  // Also: Handler changes liked value as it should and is overritten when selecting a new exercise as described above

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
        <Pressables onPress={{like: handleLike, options: handleOptions}} colors={colors} like={like}/>
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