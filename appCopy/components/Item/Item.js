import React from 'react';
import { View, StyleSheet} from 'react-native';

function Item({children, appConstants}) {

  return (
    <View style={styles(appConstants).item}>
      {children}
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