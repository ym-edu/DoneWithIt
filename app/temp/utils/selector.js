// import React from 'react';
// import { RepsSet, RepsTarget, TimeSet, TimeTarget } from '../Counter';

// export default selector = ({mode, reps, count, time}) => {
//   switch(mode) {
//     case 'r1':
//       return <RepsSet reps={reps}/>;
//       break;
//     case 'r2':
//       return <RepsTarget reps={reps}/>;
//       break;
//     case 't1':
//       return <TimeSet count={count}/>;
//       break;
//     case 't2':
//       return <TimeTarget count={count} time={time}/>;
//       break;
//     default:
//       alert('NAN');
//   }
// }







// ===== Controls =====
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Previous, Next, Reset, Counter } from './'
// const isPaused = false;
import { Container } from '../../layout'

function Controls({data, id}) {
  // console.log(`DATA ID: ${id}|`, data)



  // ===== countDown =====
  const [count, setCount] = useState(data.reps)
  const complete = useRef(false)
  
  if(count === 0) {
    complete.current = true
  }

  const repsCountDown = () => {
    setCount(count - 1)
    if(count === 1) alert('Exercise Complete') // LAST REP: from 1 -> 0
  }

  const repsCountUp = () => {
    setCount(count + 1)
  }
  // ===== countDown =====



  // ===== Reset =====
  const starting = useRef(true)

  if(count < data.reps) {
    starting.current = false
  }

  function repsSetReset() {
    setCount(data.reps)
    complete.current = false;
    starting.current = true;
  }

  function repsTargetReset() {
    setCount(0)
    complete.current = false;
    starting.current = true;
  }
  // ===== Reset =====

  function formatTime(min, sec) {
    return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
  }

  const selectPressHandler = () => {
    switch(data.mode) {
      case 'r1':
        return repsCountDown();
      case 'r2':
        return repsCountUp();
      case 't1':
        return ;
      case 't2':
        return ;
    }
  }

  const selectResetHandler = () => {
    switch(data.mode) {
      case 'r1':
        return repsSetReset();
      case 'r2':
        return repsTargetReset();
      case 't1':
        return ;
      case 't2':
        return ;
    }
  }




  // ===== proccessedData =====
  const display = {
    id: data.id,
    reps: data.reps,
    repsCount: count,
    time: formatTime(data.min,data.sec),
    timeCount: '03:00',
    onPress: selectPressHandler, // for mode
    onReset: selectResetHandler,
    disabled: false,
  }
  // ===== proccessedData =====
  
  
  useEffect(() => {
    display.onReset()
  }, [data.id])



















  // const interval = React.useRef(null);

  // const countDown = () => {
  //   setMillis((count) => {
  //     if(count === 0) {
  //       return count;
  //     }
  //     const timeLeft = count - 1000;

  //     return timeLeft;
  //   })
  // }

  // useEffect(() => {
  //   if(isPaused) {
  //     return;
  //   }
  //   interval.current = setInterval(countDown, 1000);
  //   return () => clearInterval(interval.current)
  // }, [isPaused])

  // const minutesToMillis = (min) => min * 1000 * 60;
  // const secondsToMillis = (sec) => sec * 1000;
  // const totalMillis = minutesToMillis(data.min) + secondsToMillis(data.sec)

  // const formatTime = (count) => count < 10 ? `0${count}` : count;

  // const [millis, setMillis] = useState(totalMillis)
  // const minutes = Math.floor(millis / 1000 / 60) % 60;
  // const seconds = Math.floor(millis / 1000) % 60;
  
  // const count = `${formatTime(minutes)}:${formatTime(seconds)}`
  // const time = `${formatTime(data.min)}:${formatTime(data.sec)}`



  // const exercise = Object.assign(data, {count, time});
  // console.log(exercise);

  return (
    <Container style={styles.container}>
      <View style={styles.controls}>
        <Previous
        onPress={()=>null} woStarting={true}/>

        <Counter mode={data.mode} item={display}/>

        <Next
        onPress={()=>null} woEnding={false}/>
      </View>

      <Reset
      onPress={display.onReset} exStarting={false}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  controls: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Controls;