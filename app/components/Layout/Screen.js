import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { sizes, colors } from '../../config/index';

function Screen({children}) {
  const appConstants = {
    sizes,
    colors,
  }
  console.log(appConstants)

  return (
    <SafeAreaView style={styles(appConstants).screen}>
      <View style={styles(appConstants).content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = ({ sizes, colors }) => StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: sizes.statusBar,
    backgroundColor: colors.secondary,
  },
  content: {
    backgroundColor: colors.primaryDarker,

    flex: 1,

    // alignSelf: 'center',
    // width: sizes.screenWidth,
    // height: sizes.screenHeight,

    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // marginTop: sizes.statusBar
    // // paddingTop: sizes.statusBar

    // ...StyleSheet.absoluteFillObject,
    // marginTop: sizes.statusBar,
    // // paddingTop: sizes.statusBar
  }
})

export default Screen;