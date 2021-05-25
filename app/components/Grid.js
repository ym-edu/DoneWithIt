import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RepsInput from './RepsInput';
import TimeInput from './TimeInput';
import WeightInput from './WeightInput';
import { FontAwesome } from '@expo/vector-icons';

export default function Grid({data, setWeightState, setModeState}) {
  const [reset, setReset] = useState(false);

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
      <RepsInput current={'repsFixed'} data={data.mode.repsFixed} setModeState={setModeState} reset={reset}/>
      <TimeInput current={'timeFixed'} data={data.mode.timeFixed} setModeState={setModeState} reset={reset}/>
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>To failure</Text>
      </View>
      <RepsInput current={'repsTarget'} data={data.mode.repsTarget} setModeState={setModeState} reset={reset}/>
      <TimeInput current={'timeTarget'} data={data.mode.timeTarget} setModeState={setModeState} reset={reset}/>
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>Weight</Text>
      </View>
      <WeightInput data={data.weight} setWeightState={setWeightState} reset={reset}/>
      <TouchableOpacity
        style={[styles.col, {alignItems: 'center'}]}
        onPress={() => setReset(!reset)}
      >
        <FontAwesome name="repeat" size={16} color="white" />
        <Text style={[styles.text]}>reset changes</Text>
      </TouchableOpacity>
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
