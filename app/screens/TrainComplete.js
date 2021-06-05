import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useIcon } from '../layout';
import Spacer from '../components/Spacer';

function TrainComplete({route: {params: {items}}}) {
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
            <Text style={[styles.heading, {fontSize: 16}]}>Exercises Completed</Text>
            <Text style={[styles.heading, {fontSize: 24}]}>34 / 43</Text>
          </View>
          <View>
            <Text style={[styles.heading, {fontSize: 16}]}>Time Worked</Text>
            <Text style={[styles.heading, {fontSize: 24}]}>34 / 43</Text>
          </View>
        </View>

        <Spacer mV={16}/>
      </View>
    )
  }

  return (
    <>
      <Header/>
      <View style={styles.container}>
        {/* <Button title={'log'} onPress={() => {
          console.log(items)
        }}/> */}
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
})

export default TrainComplete;