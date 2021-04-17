import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CreateButton from '../components/CreateButton'
import Spacer from '../components/Spacer';
import ExerciseCard from '../components/ExerciseCard'

function Workout({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList style={styles.content}
          data={exercises}
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
      {/* <Text style={styles.text}>{routeData}</Text> */}
      <Spacer mV={16}
      style={{width: '100%', borderTopWidth: 1, borderTopColor: '#383B3B',}}/>
      <CreateButton icon={'plus'} title='add exercises' onPress={() => navigation.navigate("Modal", {list: exArray.current, woId: routeData })}/>
      <Spacer mV={16}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'pink',
  },
  text: {
    color: 'white'
  }
})

export default Workout;
