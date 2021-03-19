import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useIcon } from '../../layout'

function LibraryTab() {
  const Icon = useIcon()

  function Thumbnail() {
    return(
      <View style={styles.thumbnail} />
    )
  }
  function Empty() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="media-empty" size={40} />
      </View>
    )
  }

  function Card({empty}) {
    return(
      <View style={styles.card}>
        <View style={styles.media}>
          {empty ? <Empty/> : <Thumbnail/>}
        </View>
        <View style={styles.textDescription}>
          <Text style={styles.main}>my exercises</Text>
          <Text style={styles.sub}>100 exercises</Text>
        </View>
      </View>
    )
  }

  function Add() {
    return(
      <View style={[styles.card, {height: 32, borderRadius: 0, marginTop: 32}]}>
        <View style={[styles.media, {height: 32, borderRadius: 4}]}>
          <Icon name='plus'/>
        </View>
        <Text style={[styles.main, {marginLeft: 8}]}>New Workout</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Card empty={true}/>
        <Add/>
      </View>
      <View style={styles.content}>
        <Card />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white'
  },
  header: {
    // flex: 1/3,
    // backgroundColor: 'cyan',
    padding: 16,
    paddingTop: 32,
    // borderTopWidth: 1,
    // borderTopColor: '#383B3B',
    borderBottomWidth: 1,
    borderBottomColor: '#383B3B',
  },
  content: {
    padding: 16,
  },
  card: {
    height: 80,
    width: '100%',
    backgroundColor: '#171818',
    // backgroundColor: 'cyan',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  media: {
    aspectRatio: 1,
    backgroundColor: "#242626",
    // backgroundColor: "chartreuse",
    height: 80,
    alignSelf: 'flex-start',
    borderRadius: 8,
    justifyContent: 'center',
  },
  textDescription: {
    height: '100%',
    marginLeft: 8,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow'
  },
  main:{
    color: '#E5E5E5',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  sub:{
    color: '#C0C0B87F',
    fontWeight: '600',
    fontSize: 12,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#1D1E1E',
  }
})

export default LibraryTab;
