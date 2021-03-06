import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './'

function Controls({exercises, currentExercise: {data, id}}) {
  const allExercises = exercises;
  const [touch, setTouch] = useState([]);
  useEffect(() => {
    if(allExercises.length > 0) {
      const initialState = allExercises.map(exercise => exercise.isDisabled);
      setTouch(initialState);
      console.log(initialState)
    }
  }, [allExercises])

  const handleReset = () => {
    const newArr = [...touch]; // avoid writing over state
    newArr[id-1] = !newArr[id-1]; // find array item ID:currentExerciseId-1 (-1 to match index since index(0)=id(1)) and set to new value (flip boolean, in this case)
    setTouch(newArr); // update state setting new array with updated state for selected index
  }





  function formatTime(min, sec) {
    return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
  }

  // ===== proccessedData =====
  const display = {
    reps: data.reps,
    time: formatTime(data.min,data.sec),
  }
  // ===== proccessedData =====

// #################################
const onPress = (component) => {
  console.log(`${component} Pressed`)
}

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Previous
        onPress={() => onPress('Previous')} woStarting={false}/>

        <Counter mode={data.mode} item={display} onPress={() => console.log(`DATA ID: ${id} |`, data, touch[id-1])} />

        <Next
        onPress={() => console.log(touch)} woEnding={false}/>
      </View>

      <Reset
      onPress={handleReset} exStarting={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Controls;