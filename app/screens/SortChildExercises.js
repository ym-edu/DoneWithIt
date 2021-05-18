import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ExerciseCard from '../components/ExerciseCard';
import Spacer from '../components/Spacer';
import subtitle from '../temp/subTitle';
import TextButton from '../components/TextButton';

function Example({ navigation, route: { params: { exercises } } }) {
  const [data, setData] = useState(exercises)

  const handleEnd = (data) => {
    const list = data.map(item => {
      return item.position
    })

    console.log(list)
  }

  const renderItem = useCallback(({ item, index, drag, isActive }) => {
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
        // keyExtractor={(item, index) => `draggable-item-${index}}`} //Warning: Causes buggy behaviour, i.e. item data sorts iteself effectively, however image stays fixed in same position
        keyExtractor={data => data.id.toString()}

        renderItem={renderItem}

        onDragEnd={({data}) => {
          handleEnd(data)
          setData(data)
        }}

        ItemSeparatorComponent={() => <Spacer mV={8}/>}
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
            }}
            disabled={true}
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
    paddingHorizontal: 16,
    paddingTop: 16,
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

export default Example;