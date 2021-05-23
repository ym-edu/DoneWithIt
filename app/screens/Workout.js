import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ExerciseOptions from '../components/ExerciseOptions';
import Spacer from '../components/Spacer';
import CreateButton from '../components/CreateButton';
import ExerciseCard from '../components/ExerciseCard';
import subtitle from '../temp/subTitle';
import { useDB } from '../hooks/useDB';

function Workout({ navigation, route }) {
  const { workouts } = useDB()
  const { params: { id } } = route;

  const [exercises, setExercises] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0)

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
        }));
        // console.log(exerciseDocs) //TODO: Save state for parent to determine count
        setExercises(exerciseDocs.reverse())
        
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
        renderItem={({ item }) => (
          // <ExerciseOptions data={item}/>
          <ExerciseCard
            url={item.video.url} //ZfawH9NsTtl ZfawH9NsTtl
            title={item.exerciseName}
            subtitle={subtitle(item.mode)}
            onPress={() => null}
            parent={false}
            data={{id: item.id, mode: item.mode.current}}
          />
        )}
        CellRendererComponent={({ children, index, style, ...props }) => {
          // console.log(index)
          // console.log(children)

          const childrenWithProps = React.Children.map(children, (child) => {
            if(child === null || child === undefined) return;
            return React.cloneElement(child, {
              index: index,
              last: 0,
              // last: data.length-1,
            });
          });

          return (
            <View style={[style, styles.cell, index === 0 && {marginBottom: 0}]}>
              {childrenWithProps.reverse()}
            </View>
          )
        }}
        contentContainerStyle={{flexDirection: 'column-reverse', paddingTop: 16, marginHorizontal: 16}}

        // inverted
        // initialScrollIndex={8}
        // getItemLayout={(data, index) => ({length: 72, offset: 72 * index, index})}

        // ItemSeparatorComponent={() => <Spacer mV={8}/>}
        ListHeaderComponent={() => <Spacer mV={64 * 2}/>}
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
  cell: {
    marginBottom: 8,
    // paddingBottom: 8,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
})

export default Workout;
