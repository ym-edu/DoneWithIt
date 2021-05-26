import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RepsInput from './RepsInput';
import TimeInput from './TimeInput';
import WeightInput from './WeightInput';
import { FontAwesome } from '@expo/vector-icons';

export default function Grid({data, setWeightState, setModeState}) {
  const [reset, setReset] = useState(false);
  const [selected, setSelected] = useState();

  const handlePress = (mode) => {
    setSelected(mode)
  }

  function Modes() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'space-around'}}>
        <TouchableOpacity
          style={[
            styles.mode,
            selected === 'repsFixed' && styles.selected
          ]}
          onPress={() => {
            handlePress('repsFixed')
          }}
        >
          <Text style={[styles.text, styles.textSmall]}>Fixed Reps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mode,
            selected === 'timeFixed' && styles.selected
          ]}
          onPress={() => {
            handlePress('timeFixed')
          }}
        >
          <Text style={[styles.text, styles.textSmall]}>Fixed Time</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mode,
            selected === 'repsTarget' && styles.selected
          ]}
          onPress={() => {
            handlePress('repsTarget')
          }}
        >
          <Text style={[styles.text, styles.textSmall]}>Reps Target</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mode,
            selected === 'timeTarget' && styles.selected
          ]}
          onPress={() => {
            handlePress('timeTarget')
          }}
        >
          <Text style={[styles.text, styles.textSmall]}>Time Target</Text>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    setModeState(prev => ({
      ...prev, "current": selected,
    }))
  }, [selected])

  useEffect(() => {
    setSelected(data.mode.current)
  }, [reset])

  return (
    <>
    <Modes/>
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
      <RepsInput
        current={'repsFixed'}
        data={data.mode.repsFixed}
        setModeState={setModeState}
        reset={reset}
        style={selected === 'repsFixed' && styles.quadrantII}
      />
      <TimeInput
        current={'timeFixed'}
        data={data.mode.timeFixed}
        setModeState={setModeState}
        reset={reset}
        style={selected === 'timeFixed' && styles.quadrantI}
      />
    </View>

    <View style={[styles.row, {flex: 0}]}>
      <View style={[styles.col, styles.colOne]}>
        <Text style={styles.text}>To failure</Text>
      </View>
      <RepsInput
        current={'repsTarget'}
        data={data.mode.repsTarget}
        setModeState={setModeState}
        reset={reset}
        style={selected === 'repsTarget' && styles.quadrantIII}
      />
      <TimeInput
        current={'timeTarget'}
        data={data.mode.timeTarget}
        setModeState={setModeState}
        reset={reset}
        style={selected === 'timeTarget' && styles.quadrantIV}
      />
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
        {/* <FontAwesome name="repeat" size={16} color="white" /> */}
        <Text style={[styles.text, {color: '#D03050'}]}>reset</Text>
      </TouchableOpacity>
    </View>

    </View>
    </>
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
  quadrantI: {
    borderBottomWidth: 2,
    borderBottomColor: '#C0C0B87F',
    borderLeftWidth: 2,
    borderLeftColor: '#C0C0B87F',
    borderRadius: 0,
  },
  quadrantII: {
    borderRightWidth: 2,
    borderRightColor: '#C0C0B87F',
    borderBottomWidth: 2,
    borderBottomColor: '#C0C0B87F',
    borderRadius: 0,
  },
  quadrantIII: {
    borderTopWidth: 2,
    borderTopColor: '#C0C0B87F',
    borderRightWidth: 2,
    borderRightColor: '#C0C0B87F',
    borderRadius: 0,
  },
  quadrantIV: {
    borderTopWidth: 2,
    borderTopColor: '#C0C0B87F',
    borderLeftWidth: 2,
    borderLeftColor: '#C0C0B87F',
    borderRadius: 0,
   },
   mode: {
     backgroundColor: 'transparent',
     borderWidth: 1,
     borderColor: '#C0C0B87F',
     borderRadius: 16,
     marginHorizontal: 2,
     paddingVertical: 4,
     paddingHorizontal: 8,
   },
   selected: {
    backgroundColor: '#C0C0B81A',
   },
   textSmall: {
    color: 'white',
    fontSize: 10,
   },
});
