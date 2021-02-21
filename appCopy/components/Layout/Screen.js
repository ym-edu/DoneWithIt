import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import appConstants from '../../config';
import { Provider } from '../../config/configContext'

function Screen({children}) {
  return (
    <Provider value={appConstants}>
      <SafeAreaView style={styles(appConstants).screen}>
        <View style={styles(appConstants).content}>
          {children}
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = ({ sizes, colors }) => StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: sizes.statusBar,
    backgroundColor: colors.highlight,
  },
  content: {
    backgroundColor: colors.primaryDarker,
    flex: 1,
  }
})

export default Screen;