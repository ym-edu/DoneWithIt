import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ExerciseCard from '../components/ExerciseCard';
import Spacer from '../components/Spacer';
import subtitle from '../temp/subTitle';
import TextButton from '../components/TextButton';
import { useDB } from '../hooks/useDB';

function SortChildExercises({ navigation, route: { params: { exercises, workoutId}}}) {
  const { db, workouts } = useDB();

  const [data, setData] = useState(exercises);
  const [changeCount, setChangeCount] = useState(0);

  const handleAdd = () => {
    const batch = db().batch();
    
    const ids = data.map(item => item.id)
    // console.log("Ids: ", ids)

    batch.update(workouts.ref.doc(workoutId).collection("childExercises")
    .doc("_tally"), {
      childExercise_index: ids.length,
    })

    let queries = ids.map(itemId => {
      return workouts.ref.doc(workoutId).collection("childExercises")
      .where(db.FieldPath.documentId(), '==', itemId).get()
    });

    Promise.all(queries).then(querySnapshots => {
      return querySnapshots.map(snapshot => snapshot.docs)
      .reduce((accumulator, resultingDocs) => [...accumulator, ...resultingDocs])
    }).then((documents) => {
      documents.forEach((doc, index) => {
        // console.log("Position: ", doc.data().position, "NewPosition: ", index)
        const ref = workouts.ref.doc(workoutId)
        .collection("childExercises").doc(doc.id)

        batch.update(ref, {
          position: index
        })
      });
      batch.commit()
      //TODO: render loading overlay while batchWrite completes
    })



  }

  const renderItem = useCallback(({ item, drag, isActive }) => {
    return (
      <ExerciseCard
          url={item.video.url}
          title={item.exerciseName}
          subtitle={subtitle(item.mode)}

          mode={"sortableList"}

          onLongPress={drag}
          isActive={isActive}
        />
    );
  }, []);

  return (
    <>
     <View style={styles.container}>
        <DraggableFlatList style={styles.flatlist}
        data={data}
        keyExtractor={data => data.id.toString()}

        renderItem={renderItem}

        onDragEnd={(event) => {
          if(event.from != event.to) {
            // console.log(event.from, event.to)
            setChangeCount(prev => prev + 1)
            setData(event.data)
          };
        }}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16}}
        // ItemSeparatorComponent={() => <Spacer mV={8}/>}
        ListFooterComponent={() => <Spacer mV={64}/>}
        showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <Spacer mV={2} style={styles.line}/>
        <View style={styles.buttons}>
            <TextButton onPress={() => {
              navigation.navigate("Workout")
            }}>
              Cancel
            </TextButton>
            <TextButton
            onPress={() => {
              handleAdd()
              navigation.navigate("Workout")
            }}
            disabled={changeCount > 0 ? false : true}
            >
              Save
            </TextButton>
          </View>
        <Spacer mV={2}/>
      </View>
    </>
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
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#1D1E1E',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 8
  },
})

export default SortChildExercises;
