import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function TextDescription({title, subtitle, colors}) {
  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).main} numberOfLines={2}>{title}</Text>
      <Text style={styles(colors).sub}>{subtitle}</Text>
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginLeft: 8,
  },
  main:{
    color: colors.secondary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  sub:{
    color: colors.secondaryDarker,
    fontWeight: '600',
    fontSize: 12,
  },
})

export default TextDescription;