import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, FlatList } from 'react-native';
import { useIcon } from '../layout';
import Spacer from '../components/Spacer';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import subtitle from '../temp/subTitle';
import ExerciseCard from '../components/ExerciseCard';
import TextButton from '../components/TextButton';
import sizes from '../config/constants/sizes';

const formatTime = (millis) => {
  const formatedTime = moment.duration(millis, "milliseconds").format("hh:mm:ss").padStart(4, "0:0");
  return formatedTime
}

function TrainComplete({navigation, route: {params: {items, stats, workoutName}}}) {
  const Icon = useIcon();

  function Header() {
    return (
      <View style={[styles.header]}>
        <Spacer mV={8}/>
        <Text style={[styles.heading, {textAlign: 'center'}]}>workout complete</Text>
        <Spacer mV={8}/>

        <View style={{alignItems: 'center'}}>
          <Icon name='medal' style={styles.vector} size={128} color='white'/>
        </View>

        <Spacer mV={16}/>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, alignItems: 'center'}}>
          <View>
            <Text style={[styles.heading, {fontSize: 16}]}>Total Exercises</Text>
            <Text style={[styles.heading, {fontSize: 24}]}>{`${stats.completedItemsCount} / ${stats.itemsCount}`}</Text>
          </View>
          <View>
            <Text style={[styles.heading, {fontSize: 16}]}>Completed In</Text>
            <Text style={[styles.heading, {fontSize: 24}]}>{formatTime(stats.duration)}</Text>
          </View>
        </View>

        <Spacer mV={16}/>
      </View>
    )
  }

  return (
    <>
      <Header/>
      {/* <Button title={'log'} onPress={() => {
        }}/> */}
      <View style={{flex: 1}}>
        <FlatList style={{flex: 1}}
          data={items}
          keyExtractor={item => item.id.toString()}

          renderItem={({ item }) => (
            <ExerciseCard
              url={item.video.url}
              title={item.exerciseName}
              subtitle={subtitle(item.mode)}

              variant={'stats'}
              completed={item.session.isFinished}
            />
          )}
          contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1}}
          // ItemSeparatorComponent={() => <Spacer mV={8}/>}
          ListHeaderComponent={() => (
            <>
              <Spacer mV={16}/>
              <Text style={[styles.heading, {fontSize: 16}]}>{`Results for: ${workoutName}`}</Text>
              <Spacer mV={16}/>
            </>
          )}
          ListFooterComponent={() => (
            <>
              <Spacer mV={4} style={styles.line}/>
              <TextButton onPress={() => {
                navigation.navigate("Library")
              }}>
                done
              </TextButton>
            </>
          )}
          ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end', marginBottom: 8, marginTop: 32}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 9/16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    // flex: 7/16,
    backgroundColor: '#1D1E1E',
  },
  vector: {
    width: 128,
    height: 128,
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    width: sizes.screenWidth,
    left: -16,
    borderTopWidth: 1,
    borderTopColor: '#383B3B',
    position: 'absolute',
    bottom: 40,
  },
})

export default TrainComplete;