import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { selector } from './'
// const isPaused = false;
import { useIcon } from '../../layout'

function Counter({data, id}) {
  console.log(`DATA ID: ${id}|`, data)

  useEffect(() => {
    handleReset()
  }, [id])

  // ===== countDown =====
  const [count, setCount] = useState(data.reps)
  const complete = useRef(false)
  
  if(count === 0) {
    complete.current = true
  }

  const handlePress = () => {
    setCount(count - 1)
    if(count === 1) alert('Exercise Complete') // LAST REP: from 1 -> 0
  }
  // ===== countDown =====



  // ===== Reset =====
  const starting = useRef(true)

  if(count < data.reps) {
    starting.current = false
  }

  const Icon = useIcon()

  const handleReset = () => {
    setCount(data.reps)
    complete.current = false;
    starting.current = true;
  }
  // ===== Reset =====



  // ===== proccessedData =====
  const counter = { 
    mode: data.mode,
    reps: count,
  }
  // ===== proccessedData =====
  
  




















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
    <>
      <TouchableOpacity onPress={handlePress} disabled={complete.current}>
        { selector(counter) }
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf: 'center', marginTop: 16}}
        onPress={handleReset} disabled={starting.current}>
        <Icon name='close' color={starting.current ? '#383B3B' : 'white'}/>
      </TouchableOpacity>
    </>
  );
}

export default Counter;