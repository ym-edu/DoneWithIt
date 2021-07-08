/**Security Rules Requirements ✅
 * onSnapshot() -list- @ workouts | allow list: if is owner 
 * onSnapshot() -get- @ parentExercises/_tally | allow get: if is owner
*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
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
      }, (error) => {
      console.log(error)
      });
    };
    fetchWorkouts();

    const getParentExerciseCount = () => {
      unsubscribeFromParentExercises = tally
      .onSnapshot(snapshot => {
        if (snapshot.data() !== undefined) {
          // console.log("snapshot", snapshot)
          const tallyDoc = snapshot?.data()
          setExerciseCount(tallyDoc.parentExercise_count) //TODO: Pass count to CreateWorkout as next workout index (spotify like default naming)
        }
      }, (error) => {
        console.log(error)
      });
    };
    getParentExerciseCount();

    return () => {
      unsubscribeFromWorkouts()
      unsubscribeFromParentExercises()
    };
  }, []);

  function Content() {
    return (
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
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListFooterComponent={() =>
          <Spacer mV={64}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  function Empty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.message}>Looks like you don't have any workouts yet</Text>
        <Text style={[styles.message, styles.subMessage]}>Create a workout so you can start training for a fitter, healthier body</Text>
      </View>
    )
  }

  return (
    <>
      <View style={styles.header}>
          <WorkoutCard
          title={'Exercises'}
          subtitle={exerciseCount}
          onPress={() => navigation.navigate('Exercises')}
          main={true}
          />
          <Spacer mV={32}/>
          <CreateButton icon={'plus'} title='create workout' onPress={
            // () => null
            () => navigation.navigate('CreateWorkout')
          }/>
      </View>

      {workouts.length > 0 ? <Content/> : <Empty/>}
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
  message: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    textAlign: 'center'
  },
  subMessage: {
    color: '#C0C0B87F',
    fontSize: 16,
  },
})

export default LibraryTab;
