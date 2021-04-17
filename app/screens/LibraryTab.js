import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import WorkoutCard from '../components/WorkoutCard'
import CreateButton from '../components/CreateButton';
import Spacer from '../components/Spacer'

function LibraryTab({navigation}) {
  return (
    <>
      <View style={styles.header}>
          <WorkoutCard
          title={'my exercises'}
          onPress={() => navigation.navigate('Exercises')}
          />
          <Spacer mV={32}/>
          <CreateButton icon={'plus'} title='create workout' onPress={
            () => navigation.navigate('CreateWorkout')
          }/>
      </View>

      <View style={styles.content}>
        <FlatList
          data={null}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <WorkoutCard
            // url={item.video.url} //TODO: cloud function
            onPress={() => navigation.navigate('Workout', {id: item.id, title: item.woName})}
            title={item.woName}
            subTitle={item.exCount}
            />
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
