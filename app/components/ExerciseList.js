import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard';
// import subtitle from '../temp/subTitle'; //Children exercises
import { useDB } from '../hooks/useDB';

function ExerciseList({ mode = 'list', state, onPress }) {
  const { parentExercises } = useDB();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const unsubscribe = parentExercises.ref
    .orderBy("exerciseName_std")
    .onSnapshot(snapshot => {
      const exerciseDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExercises(exerciseDocs)
    });
    
    return () => unsubscribe() //IMPORTANT: Never return function without callback
  }, []);

  return (
      <View style={styles.container}>
        <FlatList style={styles.flatlist}
          data={exercises}
          keyExtractor={data => data.id.toString()}

          renderItem={({ item }) => (
            <ExerciseCard
              url={item.video.url}
              title={item.exerciseName}
              subtitle={mode === 'list'
              ? `Included in ${item.children_count} workouts`
              : null}

              mode={mode}
              state={state}
              data={item.id}

              onPress={onPress}
            />
          )}

          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListFooterComponent={() => <Spacer mV={64}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flatlist: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})

export default ExerciseList;
