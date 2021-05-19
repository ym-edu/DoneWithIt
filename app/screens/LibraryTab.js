import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import CreateButton from '../components/CreateButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function LibraryTab({navigation}) {
  const { workouts: { ref }, parentExercises: { tally } } = useDB();
  const [workouts, setWorkouts] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0);

  useEffect(() => {
    let unsubscribeFromWorkouts;
    let unsubscribeFromParentExercises;
    
    const fetchWorkouts = () => {
      unsubscribeFromWorkouts = ref
      .orderBy("workoutName_std")
      // .where('__name__', '!=', '_tally') //Fetch all docs in 'workouts' collection except the tally doc
      //Note: orderBy is preferable to '__name__' by virtue of tally not having fields that a normal workout would normally have i.e. 'workoutName_std'
      .onSnapshot(snapshot => {
        const workoutDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(workoutDocs)
      });
    };
    fetchWorkouts();

    const getParentExerciseCount = () => {
      unsubscribeFromParentExercises = tally
      .onSnapshot(snapshot => {
        const tallyDoc = snapshot.data()
        setExerciseCount(tallyDoc.parentExercise_count) //TODO: Pass count to CreateWorkout as next workout index (spotify like default naming)
      });
    };
    getParentExerciseCount();

    return () => {
      unsubscribeFromWorkouts()
      unsubscribeFromParentExercises()
    };
  }, []);

  return (
    <>
      <View style={styles.header}>
          <WorkoutCard
          title={'Exercises'}
          subTitle={exerciseCount}
          onPress={() => navigation.navigate('Exercises')}
          />
          <Spacer mV={32}/>
          <CreateButton icon={'plus'} title='create workout' onPress={
            // () => null
            () => navigation.navigate('CreateWorkout')
          }/>
      </View>

      <View style={styles.content}>
        <FlatList
          data={workouts}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <WorkoutCard
            // url={item.video.url} //TODO: cloud function
            onPress={
              () => navigation.navigate('Workout', {id: item.id, workoutName: item.workoutName})
              // () => null
            }
            title={item.workoutName}
            subTitle={item.parentExerciseCount}
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListFooterComponent={() =>
          <Spacer mV={64}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#383B3B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})

export default LibraryTab;
