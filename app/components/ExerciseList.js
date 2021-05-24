import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard';
// import subtitle from '../temp/subTitle'; //Children exercises
import { useDB } from '../hooks/useDB';

function ExerciseList({ mode = 'list', state, setState }) {
  const { parentExercises } = useDB();
  const [exercises, setExercises] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState([]);

  const handleMenuState = (index, open) => {
    // console.log(index)
    const i = index;

    let stateArray;

    if(open) {
      stateArray = menuIsOpen.map(item => false)
    } else stateArray = [...menuIsOpen]

    stateArray[i] = !stateArray[i];

    setMenuIsOpen(stateArray)
  }

  useEffect(() => {
    const unsubscribe = parentExercises.ref
    .orderBy("exerciseName_std")
    .onSnapshot(snapshot => {
      const exerciseDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isEditing: false,
      }));
      setExercises(exerciseDocs)
    });
    
    return () => unsubscribe() //IMPORTANT: Never return function without callback
  }, []);

  useEffect(() => {
    if(exercises.length > 0) {
      const initialState = exercises.map(item => item.isEditing)
      setMenuIsOpen(initialState)
    }
  }, [exercises])

  return (
      <View style={{flex: 1}}>
        <FlatList style={styles.flatlist}
          data={exercises}
          keyExtractor={data => data.id.toString()}

          renderItem={({ item, index }) => (
            <ExerciseCard
              url={item.video.url}
              title={item.exerciseName}
              // subtitle={mode === 'list'
              // ? `Included in ${item.children_count} workouts`
              // : null}

              mode={mode}
              data={{id: item.id, video: item.video}}
              
              state={state}
              setState={setState}

              menuIsOpen={menuIsOpen}
              handleMenuState={handleMenuState}

              index={index}
            />
          )}
          contentContainerStyle={{paddingTop: 16, marginHorizontal: 16}}
          // ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListFooterComponent={() => <Spacer mV={64}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },
})

export default ExerciseList;
