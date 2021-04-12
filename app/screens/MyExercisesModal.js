import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Spacer from '../components/Spacer';
import firestore from '@react-native-firebase/firestore'
import ExerciseCard from '../components/ExerciseCard'
import TextButton from '../components/TextButton'

function MyExercises({ navigation, route }) {
  const exArray = route.params.list
  const userId = 'user-1';
  const currentWorkout = route.params.woId
  const [exercises, setExercises] = useState(null);
  const [selection, setSelection] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(null)

  const handleAdd = () => {
    const increment = firestore.FieldValue.increment(1)
    // console.log('added')
    selection.forEach(item => {
      if(exArray.includes(item)) return;
      // console.log(item)
      firestore().collection("users").doc(userId).collection("exercises").doc(item)
      .set({
        workouts: {
          [currentWorkout]: exerciseCount
        }
      }, { merge: true });


      firestore().collection("users").doc(userId).collection("workouts").doc(currentWorkout).update({
        exCount: increment,
      })
    })

  }

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
    let unsubscribeFromExerciseCount;

    const fetchExercises = () => {
      unsubscribeFromExercises = firestore().collection("users").doc(userId).collection("exercises").orderBy("exName")
      .onSnapshot(snapshot => {
        const exerciseDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("ExerciseCount", exerciseDocs.length)
        setExercises(exerciseDocs)
      })
    };
    fetchExercises()

    const getExerciseCount = () => {
      unsubscribeFromExerciseCount = firestore().collection("users").doc(userId)
      .collection("workouts").doc(currentWorkout)
      .onSnapshot(snapshot => {
        const workoutDoc = snapshot.data().exCount
        setExerciseCount(workoutDoc)
        // console.log("Count", userDoc)
      });
    }
    getExerciseCount()

    return () => {
      unsubscribeFromExercises()
      unsubscribeFromExerciseCount()
    }
  }, [])

  return (
    <>
      <View style={styles.body}>
        <FlatList style={styles.content}
          data={exercises}
          keyExtractor={data => data.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              disabled={false}
              id={item.id}
              url={item.video.url}
              title={item.exName}
              subtitle={selectSubtitle(item.data)}
              onPress={setSelection}
              now={selection}
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <Spacer mV={16}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 32}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton onPress={() => {
              handleAdd()
              navigation.pop()
            }}>
              Add
            </TextButton>
          </View>
        <Spacer mV={16}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'pink',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white'
  }
})

export default MyExercises;
