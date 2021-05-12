import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { constants } from '../config';
const { colors } = constants;

function SearchBar({ onPress, placeholder, fill = true, focus = true, onSubmit}) {
  const inputRef = useRef()

  useEffect(() => {
    if(focus) {
      inputRef.current.focus()
    }
  }, [])

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
    style={[styles.searchBar, !fill && {backgroundColor: 'transparent'}]}
    placeholder={placeholder}
    onIconPress={onPress}
    icon={true}
    ref={inputRef}
    onSubmitEditing={({ nativeEvent }) => {
      onSubmit(nativeEvent.text)
    }}
    multiline={false} //Not working
    numberOfLines={1} //Not working
    // blurOnSubmit={false} //TEMP: temporary workaround untill i figure out how to make number of lines work on this component
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    // Next two props necessary for preventing searchbox from expanding with longer text
    height: 40,
    backgroundColor: '#242626',
  },
})

export default SearchBar;
