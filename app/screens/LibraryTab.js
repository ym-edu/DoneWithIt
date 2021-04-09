import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import WorkoutCard from '../components/WorkoutCard'
import CreateButton from '../components/CreateButton';
import Spacer from '../components/Spacer'
import firestore from '@react-native-firebase/firestore'

function LibraryTab({navigation}) {
  const userId = 'user-1';
  const [workouts, setWorkouts] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      await firestore().collection("users").doc(userId).collection("workouts")
      .get()
      .then(snapshot => {
        const workoutDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(workoutDocs)
        setWorkouts(workoutDocs)
      })
    }
    fetchWorkouts()
  }, [])

  return (
    <>
    <View style={styles.header}>
        <WorkoutCard
        title={'my exercises'}
        // subTitle={user.exercises.length} //TODO: FieldValue.increment(1) per exercise
        onPress={() => navigation.navigate('Exercises')}
        />
        <Spacer mV={32}/>
        <CreateButton icon={'plus'} title='create workout' onPress={
          () => navigation.navigate('Alert')
        }/>
    </View>

      <View style={styles.content}>
      <FlatList
          data={workouts}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <WorkoutCard
            // url={item.video.url} //TODO: cloud function
            title={item.woName}
            subTitle={item.exCount}
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
