import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import IconButton from '../IconButton'
import { SimpleLineIcons } from '@expo/vector-icons'; 


function Pressables({ onPress, like, colors }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPress.like}
      >
        <IconButton
          // modStyle={styles.item}
          icon={'flex'}
          iconColor={ like ? 'white' : colors.highlight}
          size={24}
          halo={1}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPress.options}
      >
        <SimpleLineIcons
          style={styles.item}
          name="options-vertical" size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginLeft: 8,
  }
})

export default Pressables;