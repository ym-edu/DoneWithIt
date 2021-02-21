import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { constants } from '../config'
const { colors } = constants;

export default function Screen({children}) {
  return (
    <SafeAreaView style={styles.screenBar}>
      <StatusBar
        style={'light'}
        backgroundColor={colors.primaryLighter}
        translucent={false}
      />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenBar: {
    flex: 1,
    backgroundColor: colors.primaryLighter,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primaryDarker,
  },
})
