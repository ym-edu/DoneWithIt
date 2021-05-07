import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RepsInput from './RepsInput';
import TimeInput from './TimeInput';

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
        <Text style={styles.text}>Fixed Set</Text>
      </View>
      <RepsInput/>
      <TimeInput/>
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>To Failure</Text>
      </View>
      <RepsInput/>
      <TimeInput/>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#171818',
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
    // borderWidth: 1,
    // borderColor: 'red',
  },
  colOne: {
    // flex: 3/4,
    flex: 2/3,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: "700",
  },
});
