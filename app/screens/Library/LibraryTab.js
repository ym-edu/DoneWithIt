import React from 'react';
import { StyleSheet, View } from 'react-native';
import WorkoutCard from '../../components/WorkoutCard'
import CreateButton from '../../components/CreateButton';
import Spacer from '../../components/Spacer'

const data = {
  url: "ZfawH9NsTtI"
}

function LibraryTab() {
  return (
    <>
      <View style={styles.header}>
        <WorkoutCard/>
        <Spacer mV={32}/>
        <CreateButton icon="plus" title="new workout"/>
      </View>
      <View style={styles.content}>
        <WorkoutCard data={data.url} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  header: {
    padding: 16,
    paddingTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#383B3B',
  },
  content: {
    padding: 16,
  },
})

export default LibraryTab;
