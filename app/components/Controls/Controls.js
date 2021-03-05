import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import selector from './selector'
// const isPaused = false;
import { Container, useIcon } from '../../layout'

function Controls({data, id}) {
  // console.log(`DATA ID: ${id}|`, data)

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
      <Container style={styles.container}>
        <View style={styles.controls}>
          <TouchableOpacity style={{alignSelf: 'center'}}
            onPress={handleReset} disabled={starting.current}>
            <Icon name='angle' container={false} size={32} color={starting.current ? '#383B3B' : 'white'}/>
          </TouchableOpacity>

          <TouchableOpacity style={{marginHorizontal: 16}}
          onPress={handlePress} disabled={complete.current}>
            { selector(counter) }
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', transform: [{rotateY: '180deg'}]}}
            onPress={handleReset} disabled={starting.current}>
            <Icon name='angle' container={false} size={32} color={starting.current ? '#383B3B' : 'white'}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{alignSelf: 'center', marginTop: 16}}
          onPress={handleReset} disabled={starting.current}>
          <Icon name='close' container={true} color={starting.current ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
      </Container>
    </>
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