import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import CreateButton from '../components/CreateButton';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function LibraryTab({navigation}) {
  const db = useDB();
  const [workouts, setWorkouts] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);

  useEffect(() => {
    let unsubscribeFromWorkouts;
    let unsubscribeFromCounts;
    
    const fetchWorkouts = () => {
      unsubscribeFromWorkouts = db.collection("workouts")
      .onSnapshot(snapshot => {
        const workoutDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(workoutDocs)
      });
    };
    fetchWorkouts();

    const getCounts = () => {
      unsubscribeFromCounts = db.onSnapshot(snapshot => {
        const userDoc = snapshot.data()
        setExerciseCount(userDoc.parentExerciseCount)
        setWorkoutCount(userDoc.workoutCount) //TODO: Pass count to CreateWorkout as next workout index (spotify like default naming)
      });
    };
    getCounts();

    return () => {
      unsubscribeFromWorkouts()
      unsubscribeFromCounts()
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
              // () => navigation.navigate('Workout', {id: item.id, title: item.workoutName})
              () => null
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
