import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Details({title, subTitle}) {
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}>{title}</Text>
      <Text style={styles.secondaryText}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 16,
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
