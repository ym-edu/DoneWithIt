import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { constants } from '../../../config'
const { colors, sizes } = constants;

function RepsTarget({count, reps}) {
  return (
    <View style={styles.container}>
      <View style={styles.span}>
        <Text style={styles.text}>{count}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.span}>
        <Text style={[styles.text, styles.textAlt]}>{reps}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLighter,
    width: 96,
    height: 48,
    borderRadius: sizes.spacerHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderLeftColor: colors.secondaryLighter,
    borderLeftWidth: StyleSheet.hairlineWidth,
    height: 24,
  },
})

export default RepsTarget