import React, { Fragment } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import IconButton from '../IconButton'

import { SimpleLineIcons } from '@expo/vector-icons'; 


function Pressables() {
  return (
    <View style={styles.container}>
      <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => alert('Added to liked exercises')}
      >
        <IconButton
          modStyle={styles.item}
          icon={'flex'}
          iconColor={'white'}
          buttonColor={'black'}
          size={20}
          halo={1}
        />
      </TouchableHighlight>
      
      <TouchableOpacity>
        <SimpleLineIcons
          style={styles.item}
          name="options-vertical" size={24}
          color="black"
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
    backgroundColor: 'violet',
  },
  item: {
    // marginLeft: 8,
  }
})

export default Pressables;