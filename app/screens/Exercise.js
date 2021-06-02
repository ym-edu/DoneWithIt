import React, { useEffect } from 'react';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import VideoLoop from '../components/VideoLoop'
import { useIcon } from '../layout'
import RepsFixed from '../components/RepsFixed';
import TimeFixed from '../components/TimeFixed';
import RepsTarget from '../components/RepsTarget';
import TimeTarget from '../components/TimeTarget';

function Exercise({ store: {index, items}, dispatch, MODES }) {
  const Icon = useIcon();
  
  const exercise = items[index];
  const session = exercise.session;
  const mode = exercise.mode.current;
  
  const isFirst = index === 0;
  const isLast = index === items.length - 1;

  useEffect(() => {
    if((session.count !== session.start) && session.isStarting){
      dispatch({ type: 'setStarting' }) //Set isStarting to false
    }
    // else if(session.count === session.end) {
    //   dispatch({ type: 'setFinished' }) //Set isFinished to true
    // }
  }, [session.count])

  function Counter() {
    switch(mode) {
      case MODES.REPS_FIXED:
        return <RepsFixed session={session} dispatch={dispatch}/>;
      case MODES.TIME_FIXED:
        return <RepsTarget session={session} dispatch={dispatch}/>;
      case MODES.REPS_TARGET:
        return <TimeFixed session={session} dispatch={dispatch}/>;
      case MODES.TIME_TARGET:
        return <TimeTarget session={session} dispatch={dispatch}/>;
    }
  }

  function Controls() {
    return(
      <>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            if(index > 0){
              dispatch({ type: 'previous' })
            }
          }}
          disabled={isFirst}>
          <Icon name='angle' size={32} color={isFirst ? '#383B3B' : 'white'}/>
        </TouchableOpacity>

        <Counter/>

        <TouchableOpacity style={{transform: [{rotateY: '180deg'}]}}
          onPress={() => {
            if(index < items.length - 1) {
              dispatch({ type: 'next' })
            }
          }}
          disabled={isLast}>
          <Icon name='angle' size={32} color={isLast ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            if(session.count < exercise.mode[mode]) {
              dispatch({ type: 'reset', payload: exercise })
            }
          }}
          disabled={session.isStarting}>
          <Icon name='close' size={24} color={session.isStarting ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
      </View>
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <VideoLoop video={exercise.video}/>
        <Controls/>
        <Button title={`log`} onPress={() => {
          console.log(exercise.session)
        }}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  }
})

export default Exercise;