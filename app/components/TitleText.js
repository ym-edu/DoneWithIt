import React from 'react';
import { StyleSheet, Text } from 'react-native';

function TitleText({ children, appConstants}) {

  return (
    <Text style={styles(appConstants).text}>{children}</Text>
  );
}

const styles = ({colors, sizes}) => StyleSheet.create({
  text: {
    color: colors.highlight,
    fontSize: sizes.spacerVertical,
    fontWeight: 'bold',
    textTransform: "uppercase",
  },
})

export default TitleText;