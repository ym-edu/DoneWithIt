import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
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
    });
    
    return () => unsubscribe()
  }, []);

  return (
    <View style={styles.container}>
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
      contentContainerStyle={{paddingTop: 32, marginHorizontal: 16}}
      ItemSeparatorComponent={() => <Spacer mV={16}/>}
      ListFooterComponent={() => <Spacer mV={64}/>}
      showsVerticalScrollIndicator={false}
      />
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
})

export default LogTab;
