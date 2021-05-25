import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RepsInput from './RepsInput';
import TimeInput from './TimeInput';
import WeightInput from './WeightInput';

export default function Flex() {
  return (
    <View style={styles.container}>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}></View>
      <View style={styles.col}>
        <Text style={styles.text}>Train for reps</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.text}>Train for time</Text>
      </View>
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>Fixed set</Text>
      </View>
      <RepsInput/>
      <TimeInput/>
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>To failure</Text>
      </View>
      <RepsInput/>
      <TimeInput/>
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>Weight</Text>
      </View>
      <WeightInput/>
      {/* //Used to align columns flush. Kind of hacky but works. */}
      <TimeInput style={{opacity: 0}}/>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor: '#171818',
  },
  row: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    // borderWidth: 1,
    // borderColor: 'green',
  },
  col: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 0,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  colOne: {
    flex: 3/4,
    // flex: 2/3,
    margin: 0,
    padding: 0,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: "700",
  },
});
