import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Spacer from '../components/Spacer';
import CreateButton from '../components/CreateButton';
import ExerciseCard from '../components/ExerciseCard';
import subtitle from '../temp/subTitle';
import { useDB } from '../hooks/useDB';

function Workout({ navigation, route }) {
  const { workouts } = useDB()
  const { params: { id } } = route;

  const [exercises, setExercises] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0);
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
    let unsubscribeFromExercises;
    let unsubscribeFromTally;

    const fetchExercises = () => {
      unsubscribeFromExercises = workouts.ref.doc(id).collection("childExercises")
      .orderBy("position")
      .onSnapshot(snapshot => {
        const exerciseDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isEditing: false
        }));
        const reversedExerciseDocs = exerciseDocs.map(doc => doc).reverse()
        // console.log(exerciseDocs) //TODO: Save state for parent to determine count
        setExercises(reversedExerciseDocs)
        
        navigation.setParams({
          exercises: exerciseDocs,
          workoutId: id,
        })
      })
    };
    fetchExercises()

    const fetchTally = () => {
      unsubscribeFromTally = workouts.ref.doc(id)
      .collection("childExercises").doc("_tally")
      .onSnapshot(tallyDoc => {
        //TODO: If workout is deleted from workout page an error occurs as listener cannot find nonexistant tally doc
        setExerciseCount(tallyDoc.data().childExercise_index)
      })
    }
    fetchTally()

    return () => {
      unsubscribeFromExercises()
      unsubscribeFromTally()
    }
  }, [])

  useEffect(() => {
    if(exercises.length > 0) {
      const initialState = exercises.map(item => item.isEditing)
      setMenuIsOpen(initialState)
    }
  }, [exercises])

  function Footer() {
    return (
      <View style={styles.footer}>
        <Spacer mV={8}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <CreateButton
        icon={'plus'}
        title='add exercises'
        onPress={() => {
          navigation.navigate("AddExercises", {
            workoutId: id,
            exerciseCount: exerciseCount,
          })
        }}/>
        <Spacer mV={8}/>
      </View>
    )
  }

  return (
    <>
    <View style={styles.container}>
      <FlatList style={styles.flatlist}
        data={exercises}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          // <ExerciseOptions data={item}/>
          <ExerciseCard
            url={item.video.url} //ZfawH9NsTtl ZfawH9NsTtl
            title={item.exerciseName}
            subtitle={subtitle(item.mode)}
            
            parent={false}
            data={{id: item.id, mode: item.mode, weight: item.weight}}
            onPress={() => null}
            
            menuIsOpen={menuIsOpen}
            handleMenuState={handleMenuState}

            index={index}
            workoutId={id}
          />
        )}
        // CellRendererComponent={({ children, index, style, ...props }) => {
        //   // console.log(index)
        //   // console.log(children)

        //   const childrenWithProps = React.Children.map(children, (child) => {
        //     if(child === null || child === undefined) return;
        //     return React.cloneElement(child, {
        //       index: index,
        //       last: 0,
        //       // last: data.length-1,
        //     });
        //   });

        //   return (
        //     <View style={[style, styles.cell, index === 0 && {marginBottom: 0}]}>
        //       {childrenWithProps.reverse()}
        //     </View>
        //   )
        // }}
        contentContainerStyle={{flexDirection: 'column-reverse', paddingTop: 16, marginHorizontal: 16}}

        // inverted
        // initialScrollIndex={8}
        // getItemLayout={(data, index) => ({length: 72, offset: 72 * index, index})}

        // ItemSeparatorComponent={() => <Spacer mV={8}/>}
        ListHeaderComponent={() => <Spacer mV={32 * 4 - 8}/>}
        showsVerticalScrollIndicator={false}
      />
    </View>

    <Footer/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingHorizontal: 16,
    // paddingTop: 16,
  },
  flatlist: {
    width: '100%',
    height: '100%',
  },
  // cell: {
  //   marginBottom: 8,
  //   // paddingBottom: 8,
  //   // borderWidth: 1,
  //   // borderColor: 'white',
  // },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
})

export default Workout;
