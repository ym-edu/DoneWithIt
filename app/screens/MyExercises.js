import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CreateButton from '../components/CreateButton'
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard'

function MyExercises({ navigation }) {
  return (
    <>
      <View style={styles.body}>
        <FlatList style={styles.content}
          data={null}
          keyExtractor={data => data.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              url={item.video.url}
              title={item.exName}
              subtitle={selectSubtitle(item.data)}
              onPress={() => null}
            />
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <Spacer mV={16}
        style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
        <CreateButton icon={'plus'} title='create exercise' onPress={() => navigation.navigate("Modal")}/>
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
