import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { constants } from '../config';
const { colors } = constants;

function SearchBar({ onPress, placeholder, flat = false }) {
  const theme = {
    colors: {
      placeholder: colors.secondaryDarker,
      primary: colors.accent,
      text: colors.secondary,
    }
  }

  return (
    <Searchbar
    theme={theme}
    style={[styles.searchBar, flat && {backgroundColor: 'transparent'}]}
    placeholder={placeholder}
    onIconPress={onPress}
    icon={true}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    backgroundColor: '#242626',
  },
})

export default SearchBar;
