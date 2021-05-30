import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Spacer from '../components/Spacer';
import CreateButton from '../components/CreateButton';
import ExerciseCard from '../components/ExerciseCard';
import subtitle from '../temp/subTitle';
import { useDB } from '../hooks/useDB';

import { useRoutineStore } from '../hooks/useRoutineStore';

function Workout({ navigation }) {
  const routineStore = useRoutineStore();
  //Observables & computeds can be destructured, actions must use dot.notation
  const {
    routineId,
    exercises,
    invertedExercises,
    exerciseCount,
  } = routineStore;

  const { workouts } = useDB()

  useEffect(() => {
    let unsubscribeFromExercises;
    let unsubscribeFromTally;

    const fetchExercises = () => {
      unsubscribeFromExercises = workouts.ref.doc(routineId).collection("childExercises")
      .orderBy("position")
      .onSnapshot(snapshot => {
        const exerciseDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isEditing: false
        }));

        routineStore.setExercises(exerciseDocs)
        // console.log(exerciseDocs) //TODO: Save state for parent to determine count


        navigation.setParams({
          exercises: exerciseDocs,
          workoutId: routineId,
        });
      })
    };
    fetchExercises()

    const fetchTally = () => {
      unsubscribeFromTally = workouts.ref.doc(routineId)
      .collection("childExercises").doc("_tally")
      .onSnapshot(tallyDoc => {
        //TODO: If workout is deleted from workout page an error occurs as listener cannot find nonexistant tally doc
        // setExerciseCount(tallyDoc.data().childExercise_count)

        navigation.setParams({
          exerciseIndex: tallyDoc.data().childExercise_index,
        });


        routineStore.setNextExerciseIndex(tallyDoc.data().childExercise_index)
      })
    }
    fetchTally()

    return () => {
      unsubscribeFromExercises()
      unsubscribeFromTally()
    }
  }, [])

  function WorkoutHeader() {
    return (
      <View style={{width: '100%', flexDirection: 'row', paddingVertical: 16}}>
        <Spacer mH={4} style={{backgroundColor: '#C0C0B8', borderTopLeftRadius: 2, borderBottomLeftRadius: 2}}/>
        <Spacer mH={16}/>
        <Text style={[styles.text, {color: '#C0C0B87F'}]}>{exerciseCount} exercises</Text>
      </View>
    )
  }

  function Footer() {
    return (
      <View style={styles.footer}>
        <Spacer mV={8}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <CreateButton
        icon={'plus'}
        title='add exercises'
        onPress={() => {
          // console.log(route.params)
          // console.log("Id ", routineStore.routineId)
          // console.log("Name ", routineStore.routineName)
          // console.log("Exercises ", routineStore.exercises)
          // console.log(routineStore.invertedExercises)
          console.log(routineStore.menuState)
          // console.log(routineStore.exerciseCount)
          // console.log(routineStore.nextExerciseIndex)
        }}/>
        <Spacer mV={8}/>
      </View>
    )
  }

  return (
    <>
    <View style={styles.container}>
      <FlatList style={styles.flatlist}
        data={invertedExercises}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <ExerciseCard
            url={item.video.url}
            title={item.exerciseName}
            subtitle={subtitle(item.mode)}
            
            parent={false}
            data={{id: item.id, mode: item.mode, weight: item.weight}}
            onPress={() => null}

            index={index}
            workoutId={routineId}
          />
        )}
 
        contentContainerStyle={{flexDirection: 'column-reverse', marginHorizontal: 16}}

        ListHeaderComponent={() => <Spacer mV={32 * 4 - 8}/>}
        ListFooterComponent={() => <WorkoutHeader/>}
        showsVerticalScrollIndicator={false}
      />
    </View>

    <Footer/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingHorizontal: 16,
    // paddingTop: 16,
  },
  flatlist: {
    width: '100%',
    height: '100%',
  },
  // cell: {
  //   marginBottom: 8,
  //   // paddingBottom: 8,
  //   // borderWidth: 1,
  //   // borderColor: 'white',
  // },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  }
})

export default Workout;
