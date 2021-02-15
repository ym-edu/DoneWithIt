import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Thumbnail, Pressables, TextDescription } from './index'

function Card(props) {
  return (
    <View style={styles(props).card}>
      <View style={styles(props).thumbnail}>
        <Thumbnail />
      </View>


      <View style={styles(props).description}>
        <TextDescription
        title={'Balance Trainer Single leg kneeling good morning'}
        subtitle={'8 reps'}
        />
      </View>


      <View style={styles(props).icons}>
        <Pressables />
      </View>
    </View>
  );
}

const styles = ({colors}) => StyleSheet.create({
  card: {
    backgroundColor: colors.primaryLighter,
    width: '100%',
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  thumbnail: {
    backgroundColor: 'red',
    aspectRatio: 16 /9,
  },
  description: {
    backgroundColor: 'blue',
    flex: 1,
  },
  icons: {
    backgroundColor: 'yellow',
  },
})

export default Card;