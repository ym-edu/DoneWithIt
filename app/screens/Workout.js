import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ExerciseOptions from '../components/ExerciseOptions';
import Spacer from '../components/Spacer';

function Workout({ navigation, route }) {
  const data = [1,2,3,4,5,6,7,8,9]

  return (
    <>
    <View style={styles.container}>
      <FlatList style={styles.flatlist}
        data={data.reverse()}
        keyExtractor={item => item.toString()}
        renderItem={({ item }) => (
          <ExerciseOptions data={item}/>
        )}
        CellRendererComponent={({ children, index, style, ...props }) => {
          // console.log(index)
          // console.log(children)

          const childrenWithProps = React.Children.map(children, (child) => {
            if(child === null || child === undefined) return;
            return React.cloneElement(child, {
              index: index,
              last: 0,
              // last: data.length-1,
            });
          });

          return (
            <View style={[style, styles.cell]}>
              {childrenWithProps.reverse()}
            </View>
          )
        }}
        contentContainerStyle={{flexDirection: 'column-reverse'}}
        // inverted
        // initialScrollIndex={8}
        // getItemLayout={(data, index) => ({length: 72, offset: 72 * index, index})}
        ItemSeparatorComponent={() => <Spacer mV={8}/>}
        ListHeaderComponent={() => <Spacer mV={64}/>}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingHorizontal: 16,
    paddingTop: 16,
  },
  flatlist: {
    width: '100%',
    height: '100%',
  },
  cell: {
    paddingHorizontal: 16,
    // backgroundColor: 'pink',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
})

export default Workout;
