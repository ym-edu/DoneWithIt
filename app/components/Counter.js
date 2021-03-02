import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { constants } from '../config'
const { colors, sizes } = constants;

function Counter({data}) {
  const reps = data.reps
  const time = `${data.min}:${data.sec}`

  function RepSet() {
    return (
      <View style={styles.repSet}>
          <Text style={styles.text}>{reps}</Text>
      </View>
    );
  }

  function RepTarget() {
    return (
      <View style={styles.repTarget}>
        <View style={{flex:1, alignItems:'center'}}>
          <Text style={styles.text}>{reps}</Text>
        </View>

        <View style={styles.lineV} />

        <View style={{flex:1, alignItems:'center'}}>
          <Text style={[styles.text, styles.textAlt]}>{reps}</Text>
        </View>
      </View>
    );
  }

  function TimeSet() {
    return (
      <View style={styles.timeSet}>
        <Text style={styles.text}>{time}</Text>
      </View>
    );
  }

  function TimeTarget() {
    return (
      <View style={styles.timeTarget}>
        <Text style={styles.text}>{time}</Text>
        <View style={styles.lineH}/>
        <Text style={[styles.text, styles.textAlt]}>{time}</Text>
      </View>
    );
  }

  const renderSwitch = (mode) => {
    switch(mode) {
      case 'r1':
        return <RepSet/>;
        break;
      case 'r2':
        return <RepTarget/>;
        break;
      case 't1':
        return <TimeSet/>;
        break;
      case 't2':
        return <TimeTarget/>;
        break;
      default:
        alert('NAN');
    }
  }

  return (
    renderSwitch(data.mode)
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  textAlt: {
    color: colors.accent,
  },
  lineH: {
    borderBottomColor: colors.secondaryLighter,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  lineV: {
    borderLeftColor: colors.secondaryLighter,
    borderLeftWidth: StyleSheet.hairlineWidth,
    height: 24,
  },
  repSet: {
    backgroundColor: colors.primaryLighter,
    width: 48,
    height: 48,
    borderRadius: sizes.spacerHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSet: {
    backgroundColor: colors.primaryLighter,
    width: 96,
    height: 48,
    borderRadius: sizes.spacerHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repTarget: {
    backgroundColor: colors.primaryLighter,
    width: 96,
    height: 48,
    borderRadius: sizes.spacerHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTarget: {
    backgroundColor: colors.primaryLighter,
    width: 96,
    height: 96,
    borderRadius: sizes.spacerHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Counter;