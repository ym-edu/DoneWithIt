import React from 'react';
import { View, StyleSheet} from 'react-native';

function Item({children, appConstants}) {
  React.Children.map(children,
    (child) => {console.log('WITHOUT PARENT PROPS', child)
    console.log('WITH PARENT PROPS',React.cloneElement(child, {appConstants}))}
    );

  return (
    <View style={styles(appConstants).item}>
      {React.Children.map(children, (child) => 
        React.cloneElement(child, {appConstants}))}
    </View>
  );
}

const styles = ({colors, sizes}) => StyleSheet.create({
  item: {
    backgroundColor: colors.primaryLighter,
    width: '100%',
    height: 72,
    borderRadius: sizes.spacerHorizontal,

    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    color: 'white',
  }
})

export default Item;