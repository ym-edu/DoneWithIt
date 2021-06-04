import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { constants } from '../../../config'
const { colors, sizes } = constants;

function TimeTarget({count, time}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.separator}/>
      <Text style={[styles.text, styles.textAlt]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLighter,
    width: 80,
    height: 80,
    borderRadius: sizes.spacerHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  span: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  textAlt: {
    color: colors.accent,
  },
  separator: {
    borderBottomColor: colors.secondaryLighter,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginVertical: 4,
  },
})

export default TimeTarget