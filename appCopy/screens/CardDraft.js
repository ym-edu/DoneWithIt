import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../config/colors';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { IconButton } from '../components';


function Sandbox(props) {
  return (
    <View style={styles().screen}>
      <View style={styles().card}>
        <View style={{backgroundColor: 'red', alignItems:'center', flexDirection: 'row', height:'100%', width: '100%', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', height:'100%'}}>
            <Image
            style={styles().thumnail}
            resizeMode={'contain'}
            source={require('../assets/thumbnail.jpg')}
            />
            <View style={{backgroundColor: 'violet', height:'100%', justifyContent:'center', marginHorizontal: 0, width: 140}}>
              <Text style={styles().text} numberOfLines={2}>Balance Trainer Single leg kneeling good morning</Text>
              <Text style={styles().subText}>8 reps</Text>
            </View>
          </View>
          <IconButton
          icon={'flex'}
          iconColor={Colors.secondary}
          buttonColor={Colors.primaryLighter}
          size={30}
          halo={1}
        />
        <SimpleLineIcons style={{marginLeft: 0, backgroundColor:'green'}} name="options-vertical" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}


const styles = (props) => StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: Colors.primaryLighter,
    width: '100%',
    height: 72,
    borderRadius: 8,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow:'hidden'
  },
  text: {
    color: 'white',
    backgroundColor: 'black',
    marginBottom: 4,
  },
  thumnail: {
    height: '100%',
    width: 128,
  },
  subText: {
    color: 'white',
    backgroundColor: 'blue',
  }
})

export default Sandbox;