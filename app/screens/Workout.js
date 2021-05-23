import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ExerciseOptions from '../components/ExerciseOptions';

function Workout({ navigation, route }) {
  const data = [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]
  return (
    <>
    <View style={styles.container}>
      <FlatList style={styles.content}
        data={data}
        keyExtractor={item => item.toString()}
        renderItem={() => (
          <ExerciseOptions/>
        )}
        initialScrollIndex={17}
        getItemLayout={(data, index) => ({length: 72, offset: 72 * index, index})}
        inverted
        // contentContainerStyle={{flexDirection: 'column-reverse'}}
        CellRendererComponent={({ children, index, style, ...props }) => {
          console.log(index)
          console.log(children)

          const childrenWithProps = React.Children.map(children[0], (child) => {
            return React.cloneElement(child, {
              index: index,
              // last: data.length-1
              last: 0
            });
          });

          const cellStyle = [
            style,
            {
              backgroundColor: 'yellow',
              // borderWidth: 2,
              // borderColor: index === data.length-1 ? 'red' : 'white',
              borderColor: index === 0 ? 'red' : 'white',
              // marginBottom: 8,
              zIndex: index * -1,
              // flex: 1,
              // position: 'relative',
              // minHeight: index === data.length-1 ? 80 : 20 ,
            }
          ]
          return (
            <View style={cellStyle}>
              {childrenWithProps}
            </View>
          )
        }}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    width: '100%',
    height: '100%',
    // overflow: 'visible', //Prevents scroll
    // flexDirection: 'column-reverse'
    // transform: [{ scaleY: -1 }],
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
