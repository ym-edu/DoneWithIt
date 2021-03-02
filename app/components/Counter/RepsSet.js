import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { constants } from '../../config'
const { colors, sizes } = constants;

function RepsSet({reps}) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{reps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLighter,
    width: 48,
    height: 48,
    borderRadius: sizes.spacerHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
})

export default RepsSet