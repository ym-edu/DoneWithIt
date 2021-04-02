import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

function LogTab() {
  return (
    <View style={styles.container}>
      <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.FULL_BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white'
  }
})

export default LogTab;
