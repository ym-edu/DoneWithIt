import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard'
import TextButton from '../components/TextButton'

function MyExercises({ navigation }) {
  return (
    <>
      <View style={styles.body}>
        <FlatList style={styles.content}
          data={null}
          keyExtractor={data => data.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              disabled={false}
              id={item.id}
              url={item.video.url}
              title={item.exName}
              subtitle={selectSubtitle(item.data)}
              onPress={setSelection}
              now={selection}
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <Spacer mV={16}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 32}}>
            <TextButton onPress={() => navigation.pop()}>
              Cancel
            </TextButton>
            <TextButton onPress={() => {
              handleAdd()
              navigation.pop()
            }}>
              Add
            </TextButton>
          </View>
        <Spacer mV={16}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'pink',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white'
  }
})

export default MyExercises;
