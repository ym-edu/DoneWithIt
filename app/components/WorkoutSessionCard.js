import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { formatAMPM, formatMD, formatHHMMSS } from '../utils';
import Spacer from './Spacer';

export default function WorkoutSessionCard({
  createdOn,
  sessionStart,
  sessionEnd,
  workoutName: TITLE,
  exerciseCount: TOTAL,
  completedExerciseCount: COUNT,
  duration,
}) {
  const { abrMonth: MONTH, date: DATE } = formatMD(createdOn);
  const { displayAMPM: FROM } = formatAMPM(sessionStart);
  const { displayAMPM: TO } = formatAMPM(sessionEnd);
  const { displayHHMMSS: DURATION } = formatHHMMSS(duration);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{`${MONTH}\n${DATE}`}</Text>
      </View>
      <View style={styles.content}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
          numberOfLines={2}
          style={[styles.title, {flex: 1}]}
          >
            {TITLE}
          </Text>
          <Spacer mH={16}/>
          <Text
          style={[styles.title, {fontSize: 12, textAlign: 'left', color: '#C0C0B87F'}]}
          >
            {`${FROM} - ${TO}`}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={styles.stat}>
            <Text 
            style={{fontSize: 12, fontWeight: 'bold', color: '#C0C0B87F', textAlign: 'center'}}
            >
              {'Exercises'}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
              {`${COUNT}/${TOTAL}`}
            </Text>
          </View>

          <View style={styles.stat}>
            <Text 
            style={{fontSize: 12, fontWeight: 'bold', color: '#C0C0B87F', textAlign: 'center'}}
            >
              {'Duration'}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
              {DURATION}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
  },
  date: {
    width: 64,
    height: 104,
    backgroundColor: '#1D1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
    color: '#C0C0B87F',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    backgroundColor: '#242626',
    padding: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
})
