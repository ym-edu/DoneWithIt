import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import ExerciseCard from '../components/ExerciseCard';
import subtitle from '../temp/subTitle';
import { useDB } from '../hooks/useDB';

function Workout({ navigation, route: { params: {id, workoutName}}}) {
  const { workouts } = useDB()

  const [exercises, setExercises] = useState([]);
  const [invertedExercises, setInvertedExercises] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0);

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
        const invertedExerciseDocs = exerciseDocs.map(doc => doc).reverse()
        // console.log(exerciseDocs) //TODO: Save state for parent to determine count
        setExercises(exerciseDocs)
        setInvertedExercises(invertedExerciseDocs)
        
        navigation.setParams({
          exercises: exerciseDocs,
          workoutId: id,
        });
      })
    };
    fetchExercises()

    const fetchTally = () => {
      unsubscribeFromTally = workouts.ref.doc(id)
      .collection("childExercises").doc("_tally")
      .onSnapshot(tallyDoc => {
        //TODO: If workout is deleted from workout page an error occurs as listener cannot find nonexistant tally doc
        setExerciseCount(tallyDoc.data().childExercise_count)

        navigation.setParams({
          exerciseIndex: tallyDoc.data().childExercise_index,
        });
      })
    }
    fetchTally()

    return () => {
      unsubscribeFromExercises()
      unsubscribeFromTally()
    }
  }, [])

// =================================== MenuState ===================================

  const [isMenuOpen, setIsMenuOpen] = useState([]);

  const handleMenuState = (index, open) => {
    const i = index;

    let stateArray;

    if(open) {
      stateArray = isMenuOpen.map(() => false)
    } else stateArray = [...isMenuOpen]

    stateArray[i] = !stateArray[i];

    setIsMenuOpen(stateArray)
  }

  useEffect(() => {
    if(exercises.length > 0) {
      const initialMenuState = exercises.map(() => false)
      setIsMenuOpen(initialMenuState)
    }
  }, [exercises])

  function WorkoutHeader() {
    return (
      <View style={{width: '100%', flexDirection: 'row', paddingVertical: 16}}>
        <Spacer mH={4} style={{backgroundColor: '#C0C0B8', borderTopLeftRadius: 2, borderBottomLeftRadius: 2}}/>
        <Spacer mH={16}/>
        <Text style={[styles.text, {color: '#C0C0B87F'}]}>
          {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}
        </Text>
      </View>
    )
  }

  function Footer() {
    return (
      <View style={styles.footer}>
        <Spacer mV={8}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <TextButton onPress={() => {
          navigation.navigate("TrainStack", {
            screen: "Train", params: {exercises: exercises, routineName: workoutName, routineId: id}
          })
        }}>
          start workout
        </TextButton>
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
            
            variant={'childExercise'}
            data={{id: item.id, mode: item.mode, weight: item.weight}}
            
            isMenuOpen={isMenuOpen}
            handleMenuState={handleMenuState}

            index={index}
            workoutId={id}
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
