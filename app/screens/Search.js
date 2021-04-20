import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../components/Spacer'

function Search({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon}
          onPress={() => navigation.pop()}
          >
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableOpacity>
          <SearchBar
          flat={true}
          placeholder="Search Youtube"
          />
          <Spacer mH={32}/>
          {/* Helps center SearchBar within header*/}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 32
  }
})

export default Search;