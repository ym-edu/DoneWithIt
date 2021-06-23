import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import WorkoutSessionCard from '../components/WorkoutSessionCard';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';

function LogTab() {
  const { workoutSessions } = useDB();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const unsubscribe = workoutSessions.ref
    .orderBy("createdOn")
    .onSnapshot(snapshot => {
      const workoutSessionDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(workoutSessionDocs)
    }, (error) => {
      console.log(error)
    });
    
    return () => unsubscribe()
  }, []);

  function List() {
    return (
      <FlatList
      data={sessions}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <WorkoutSessionCard
        createdOn={item.createdOn?.toDate()}
        sessionStart={item.sessionStart?.toDate()}
        sessionEnd={item.sessionEnd?.toDate()}
        workoutName={item.workoutName}
        exerciseCount={item.exerciseCount}
        completedExerciseCount={item.completedExercisesCount}
        duration={item.duration}
        />
      )}
      contentContainerStyle={{flexGrow: 1, paddingTop: 32, marginHorizontal: 16, backgroundColor: 'transparent'}}
      ItemSeparatorComponent={() => <Spacer mV={16}/>}
      ListFooterComponent={() => <Spacer mV={64}/>}
      showsVerticalScrollIndicator={false}
      />
    )
  }

  function Empty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.message}>Track and compare your workouts</Text>
        <Text style={[styles.message, styles.subMessage]}>Complete a workout and view your progress here</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {sessions.length > 0 ? <List/> : <Empty/>}
      {/* <Button title='log' onPress={() => {
        console.log(sessions[0].createdOn.toDate())
        console.log(sessions[0].sessionStart.toDate())
        console.log(sessions[1].sessionEnd.toDate())
        // console.log(sessionStart)
      }}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default LogTab;
