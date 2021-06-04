import React, { useEffect } from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import VideoLoop from '../components/VideoLoop';
import Spacer from '../components/Spacer';
import { useIcon } from '../layout'
import RepsFixed from '../components/RepsFixed';
import RepsTarget from '../components/RepsTarget';
import TimeFixed from '../components/TimeFixed';
import TimeTarget from '../components/TimeTarget';
import ExerciseCard from '../components/ExerciseCard';
import subtitle from '../temp/subTitle';
import TextButton from '../components/TextButton'

function Exercise({ store, dispatch, MODES, navigation }) {
  const Icon = useIcon();
  const { index, items } = store;
  
  const exercise = items[index];
  const session = exercise.session;
  const mode = exercise.mode.current;
  
  const isFirst = index === 0;
  const isLast = index === items.length - 1;

  const nextExercise = index < items.length ? items[index + 1] : null

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

  function FinishWorkout() {
    return (
      <View>
        <Spacer mV={8} style={styles.line}/>
        <TextButton onPress={() => {
          navigation.navigate("TrainComplete", { items: items })
        }}>
          finish workout
        </TextButton>
        <Spacer mV={8}/>
      </View>
    )
  }

  function AdSpace() {
    return (
      <View style={styles.adSpace}>
      </View>
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
        <AdSpace/>
        {nextExercise
        ? <View style={styles.nextExercise}>
            <View style={styles.title}>
              <Text style={[styles.text, {textAlign: 'left'}]}>Up next</Text>
            </View>
            <ExerciseCard
              url={nextExercise.video.url}
              title={nextExercise.exerciseName}
              subtitle={subtitle(nextExercise.mode)}
              
              variant={'nextExercise'}
              style={{marginBottom: 0, marginHorizontal: 0}}
            />
          </View>
        : <FinishWorkout/>}
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
    fontSize: 16,
  },
  title: {
    paddingVertical: 8,
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
  adSpace: {
    flex: 1,
  },
  nextExercise: {
    marginHorizontal: 16,
  },
})

export default Exercise;
