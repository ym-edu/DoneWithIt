import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function TextDescription({title, subtitle}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'indigo',
    marginLeft: 8
  },
  title:{
    color: 'white',
    marginBottom: 8,
  },
  subtitle:{
    color: 'pink',
  },
})

export default TextDescription;