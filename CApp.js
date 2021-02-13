import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import RooIcons from './RooIcons'

import Colors from './app/config/colors'

export default class App extends React.Component {
  state = {
    fontsLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'RooIcons': require('./app/assets/fonts/RooIcons.ttf')
    })

    this.setState({
      fontsLoaded: true
    })
  }

 _renderItem = ({item: {name}}) => {
      return <RooIcons name={'close'} size={40} color='#333' />
    }

  render() {
    if (!this.state.fontsLoaded) {
      return <Text>Waiting for fonts...</Text>
    }

    return (
      <View style={styles.container}>
        {/* <FlatList>
          numColumns={1}
          data={Object.keys(RooIconse.glyphMap).map(name => ({
            key: name,
            name
          }))}
          renderItem={this._renderItem}
        </FlatList> */}
        <View style={styles.icons}>
          <RooIcons name={'media-empty'} size={40} color={Colors.white} />
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDarker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: Colors.primaryLighter,
    borderRadius: 100,
  }
})