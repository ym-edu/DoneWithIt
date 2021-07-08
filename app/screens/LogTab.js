/**Security Rules Requirements ☑️ TODO
 * onSnapshot() -list- @ workoutSessions/tally |
 * set() -create- @ exerciseSessions |
 * set() -create- @ workoutSessions |
*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Button, Text, SectionList } from 'react-native';
import WorkoutSessionCard from '../components/WorkoutSessionCard';
import Spacer from '../components/Spacer';
import { useDB } from '../hooks/useDB';
import dayjs from 'dayjs';

import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2742026173933447/2734085062';


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
      <>
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
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fitness', 'exercise'],
      }}
      />
      </>
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

  function groupBy(list, unit = 'day', field) {
    const group = {};

    for(let session of list) {
      const unix = dayjs.unix(session[field]["seconds"]).startOf(unit).unix();
      const date = new Date(unix * 1000);
      const yy = date.getFullYear().toString().padStart(2, "0");
      const mm = date.getMonth().toString().padStart(2, "0");
      const dd = date.getDate().toString().padStart(2, "0");

      const key = '' + yy + '-' + mm + '-' + dd;

      if(group[key] == null) {
        group[key] = [];
      }
      group[key].push(session);
    }

    return group;
  }

  function section(data) {
    const groups = groupBy(data, 'day', 'sessionEnd');

    const keys = Object.keys(groups);

    const sections = keys.map(key => {
      return { title: key, data: groups[key] }
    });

    return sections
  }

  // function SectionedList() {
  //   return (
  //     <SectionList
  //     sections={section(sessions)}
  //     keyExtractor={(item, index) => item + index}
  //     renderItem={({ item }) => (
  //       <WorkoutSessionCard
  //       createdOn={item.createdOn?.toDate()}
  //       sessionStart={item.sessionStart?.toDate()}
  //       sessionEnd={item.sessionEnd?.toDate()}
  //       workoutName={item.workoutName}
  //       exerciseCount={item.exerciseCount}
  //       completedExerciseCount={item.completedExercisesCount}
  //       duration={item.duration}
  //       />
  //     )}
  //     renderSectionHeader={({ section: { title } }) => (
  //       <Text>{title}</Text>
  //     )}
  //     ItemSeparatorComponent={() => {
  //       return(
  //         <Spacer mV={8}/>
  //       )
  //     }}
  //     />
  //   )
  // }

  return (
    <View style={styles.container}>
      {sessions.length > 0 ? <List/> : <Empty/>}
      {/* <Button title='log' onPress={() => {
        console.log(section(sessions))
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
