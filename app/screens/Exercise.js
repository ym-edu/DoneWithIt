import React, { useEffect } from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import VideoLoop from '../components/VideoLoop';
import Spacer from '../components/Spacer';
import { useIcon } from '../layout'
import RepsFixed from '../components/RepsFixed';
import RepsTarget from '../components/RepsTarget';
import TimeFixed from '../components/TimeFixed';
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
  }, [session.count])

  function Counter() {
    switch(mode) {
      case MODES.REPS_FIXED:
        return <RepsFixed session={session} dispatch={dispatch}/>;
      case MODES.REPS_TARGET:
        return <RepsTarget session={session} dispatch={dispatch}/>;
      case MODES.TIME_FIXED:
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
          <Icon style={{width: 24, height: 24}} name='angle' size={24} color={isFirst ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
        
        <Spacer mH={24}/>
        <Counter/>
        <Spacer mH={24}/>
        
        <TouchableOpacity style={{transform: [{rotateY: '180deg'}]}}
          onPress={() => {
            if(index < items.length - 1) {
              dispatch({ type: 'next' })
            }
          }}
          disabled={isLast}>
          <Icon style={{width: 24, height: 24}} name='angle' size={24} color={isLast ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
      </View>

      <Spacer mV={16}/>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: 'reset', payload: exercise })
          }}
          disabled={session.isStarting}>
          <Icon style={{width: 16, height: 16}} name='close' size={16} color={session.isStarting ? '#383B3B' : 'white'}/>
        </TouchableOpacity>
      </View>
      </>
    )
  }

  function Title() {
    return(
      <>
        <View style={styles.title}>
          <Text style={styles.text}>{exercise.exerciseName}</Text>
        </View>
        <Spacer style={styles.line}/>
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <VideoLoop video={exercise.video}/>
        <Title/>
        <Spacer mV={8}/>
        <Controls/>
        <Spacer mV={8}/>
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    paddingVertical: 8,
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
})

export default Exercise;
