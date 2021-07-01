import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard';
// import subtitle from '../temp/subTitle'; //Children exercises
import { useDB } from '../hooks/useDB';

function ExerciseList({ variant, selection, setSelection }) {
  const { parentExercises } = useDB();
  const [exercises, setExercises] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState([]);

  const handleMenuState = (index, open) => {
    // console.log(index)
    const i = index;

    let stateArray;

    if(open) {
      stateArray = isMenuOpen.map(item => false)
    } else stateArray = [...isMenuOpen]

    stateArray[i] = !stateArray[i];

    setIsMenuOpen(stateArray)
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
      setIsMenuOpen(initialState)
    }
  }, [exercises])

  function Empty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.message}>Limitless exercises to choose from</Text>
        <Text style={[styles.message, styles.subMessage]}>Create an exercise from any youtube video snippet and add it to your workout</Text>
      </View>
    )
  }

  return (
      <View style={{flex: 1}}>
        {exercises.length > 0 ? 
          <FlatList style={styles.flatlist}
            data={exercises}
            keyExtractor={data => data.id.toString()}

            renderItem={({ item, index }) => (
              <ExerciseCard
                url={item.video.url}
                title={item.exerciseName}
        
                variant={variant}

                data={{id: item.id, name: item.exerciseName, video: item.video}}
                
                selection={selection}
                setSelection={setSelection}

                isMenuOpen={isMenuOpen}
                handleMenuState={handleMenuState}

                index={index}
              />
            )}
            contentContainerStyle={{paddingTop: 16, marginHorizontal: 16}}
            // ItemSeparatorComponent={() => <Spacer mV={8}/>}
            ListFooterComponent={() => <Spacer mV={64}/>}
            showsVerticalScrollIndicator={false}
          /> :
          <Empty/>}
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

export default ExerciseList;
