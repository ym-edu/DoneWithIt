import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import WorkoutCard from '../../components/WorkoutCard'
import CreateButton from '../../components/CreateButton';
import Spacer from '../../components/Spacer'
import data from '../../config/data/workout'

function LibraryTab({navigation}) {
  const user = {
    exercises: data
  }
  return (
    <>
    <View style={styles.header}>
        <WorkoutCard
        title={'my exercises'}
        subTitle={user.exercises.length}
        onPress={() => navigation.navigate('Exercises')}
        />
        <Spacer mV={32}/>
        <CreateButton icon={'plus'} title='create workout'/>
    </View>

      <View style={styles.content}>
      <FlatList
          data={data}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <WorkoutCard
            url={item.video.url}
            title={item.title}
            subTitle={item.data.reps}/>
          )}
          ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListFooterComponent={() =>
          <Spacer mV={64}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#383B3B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})

export default LibraryTab;
