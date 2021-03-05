import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

function Preview({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Next Exercise</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          '{item.data.mode}' {item.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'magenta',
    height: 96,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  text: {
    textAlign: 'center',
  },
  card: {
    height: 72,
    width: '100%',
    backgroundColor: 'chartreuse',
    borderRadius: 8,
  },
})

export default Preview;