import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CreateButton from '../components/CreateButton';
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard';
import subtitle from '../temp/subTitle';
import { useDB } from '../hooks/useDB';

function Workout({ navigation, route }) {
  const { workouts } = useDB()
  const { params: { id } } = route;

  const [exercises, setExercises] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0)

  useEffect(() => {
    let unsubscribeFromExercises;
    let unsubscribeFromTally;

    const fetchExercises = () => {
      unsubscribeFromExercises = workouts.ref.doc(id).collection("childExercises")
      .orderBy("position")
      .onSnapshot(snapshot => {
        const exerciseDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(exerciseDocs) //TODO: Save state for parent to determine count
        setExercises(exerciseDocs)
        
        navigation.setParams({
          exercises: exerciseDocs,
          workoutId: id,
        })
      })
    };
    fetchExercises()

    const fetchTally = () => {
      unsubscribeFromTally = workouts.ref.doc(id)
      .collection("childExercises").doc("_tally")
      .onSnapshot(tallyDoc => {
        //TODO: If workout is deleted from workout page an error occurs as listener cannot find nonexistant tally doc
        setExerciseCount(tallyDoc.data().childExercise_index)
      })
    }
    fetchTally()

    return () => {
      unsubscribeFromExercises()
      unsubscribeFromTally()
    }
  }, [])

  return (
    <>
    <View style={styles.container}>
      <FlatList style={styles.content}
          data={exercises}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              url={item.video.url} //ZfawH9NsTtl ZfawH9NsTtl
              title={item.exerciseName}
              subtitle={subtitle(item.mode)}
              onPress={() => null}
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListFooterComponent={() => <Spacer mV={64}/>}
          showsVerticalScrollIndicator={false}
        />
    </View>

    <View style={styles.footer}>
      <Spacer mV={8}
      style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
      <CreateButton
      icon={'plus'}
      title='add exercises'
      onPress={() => {
      navigation.navigate("AddExercises", {
        workoutId: id,
        exerciseCount: exerciseCount,
      })
      }
      }/>
      <Spacer mV={8}/>
    </View>
    </>
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
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
})

export default Workout;
