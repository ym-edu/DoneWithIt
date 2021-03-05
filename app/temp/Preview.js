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
    // backgroundColor: 'magenta',
    height: 96,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  card: {
    height: 72,
    width: '100%',
    backgroundColor: '#242626',
    // backgroundColor: 'chartreuse',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Preview;