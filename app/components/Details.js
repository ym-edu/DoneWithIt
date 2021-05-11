import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Details({title, subTitle = 'included in n workouts'}) {
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText} numberOfLines={2}>{title}</Text>
      {subTitle && <Text style={styles.secondaryText}>{subTitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  primaryText:{
    color: '#E5E5E5',
    fontWeight: 'bold',
    // textTransform: 'capitalize',
    fontSize: 16,
  },
  secondaryText:{
    color: '#C0C0B87F',
    fontWeight: '600',
    fontSize: 12,
  },
})

export default Details;
