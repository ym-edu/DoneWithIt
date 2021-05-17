import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Details({title, subtitle}) {
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText} numberOfLines={2}>{title}</Text>
      {subtitle ? <Text style={styles.secondaryText}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    paddingVertical: 0,
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
