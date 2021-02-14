import React from 'react';
import { Platform, StatusBar, SafeAreaView, View, StyleSheet } from 'react-native';

import Colors from '../config/colors'
import { FullWidthButton, IconButton, TitleText } from '../components'

function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logoContainer}>
        <IconButton
          icon={'media-empty'}
          iconColor={Colors.secondary}
          buttonColor={Colors.primaryLighter}
          size={50}
          halo={1}
        />
        <TitleText spacer={16}>Rootine</TitleText>
      </View>
      <FullWidthButton color={Colors.secondary}>
        Title
      </FullWidthButton>
      <FullWidthButton color={Colors.highlight}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    backgroundColor: Colors.primaryDarker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default WelcomeScreen;