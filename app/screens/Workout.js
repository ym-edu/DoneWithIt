import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import CreateButton from '../components/CreateButton'
import Spacer from '../components/Spacer';
import firestore from '@react-native-firebase/firestore'
import ExerciseCard from '../components/ExerciseCard'

function Workout({ navigation, route }) {
  const routeData = route.params.id

  const userId = 'user-1';
  const [exercises, setExercises] = useState(null)
  const exArray = useRef()

  const selectSubtitle = (data) => {
    switch(data.mode) {
      case 'r1':
      case 'r2':
        return `${data.reps} reps`;
      case 't1':
      case 't2':
        return (
          `${data.min === 0 ? '' : `${data.min} min `}${data.sec === 0 ? '' : `${data.sec} sec`}`
        )
      default:
        alert('NAN');
    }
  }

  useEffect(() => {
    let unsubscribeFromExercises;

    const fetchExercises = () => {
      unsubscribeFromExercises = firestore().collection("users").doc(userId).collection("exercises")
      .orderBy(`workouts.${routeData}`)
      .onSnapshot(snapshot => {
        const exerciseDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(exerciseDocs[0].id) //TODO: Save state for parent to determine count
        setExercises(exerciseDocs)
        
        exArray.current = exerciseDocs.map(item => {
          // console.log(item.id)
          return item.id
        });
        // console.log(exArray.current)
      })
    };
    fetchExercises()

    return () => {
      unsubscribeFromExercises()
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <FlatList style={styles.content}
          data={exercises}
          keyExtractor={data => data.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              url={item.video.url}
              title={item.exName}
              subtitle={selectSubtitle(item.data)}
              onPress={() => null}
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          showsVerticalScrollIndicator={false}
        />
      {/* <Text style={styles.text}>{routeData}</Text> */}
      <Spacer mV={16}
      style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
      <CreateButton icon={'plus'} title='add exercises' onPress={() => navigation.navigate("Modal", {list: exArray.current, woId: routeData })}/>
      <Spacer mV={16}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'pink',
  },
  text: {
    color: 'white'
  }
})

export default Workout;
