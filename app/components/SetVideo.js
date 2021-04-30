import react from "react";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Text } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { setEnabled } from "react-native/Libraries/Performance/Systrace";

function Video({url='ZfawH9NsTtI', start, end}) {
  const scrollEnabled = React.useRef(false)
  const enableScroll = () => {
    scrollEnabled.current = true
  }
  const disableScroll = () => {
    scrollEnabled.current = false
  }
  
  const playerRef = useRef();
  const [ready, setReady] = useState(false)
  
  const [duration, setDuration] = useState(1)
  const [startState, setStartState] = useState(0)
  const [endState, setEndState] = useState(duration)
  
  function onReady() {
    console.log("onReady")
  }
  
  
  const onStateChange = useCallback((state) => {
    //WARNING: without the duration dependancy, BEFORE & AFTER will continue to log duration as 0
    // console.log("BEFORE",duration)
    // if(duration > 0) return
    // console.log("AFTER",duration)

    if(state === 'playing' && duration <= 1) {
      // console.log('onStateChange', state)
      
      playerRef.current?.getDuration()
      .then(duration => {
        // console.log("Duration", duration)
        setDuration(duration)
        setEndState(duration)
      });
    }
  }, [ready, duration])

  useEffect(() => {
    //TODO: change start at end at | onStateChange?
  }, [duration])

  return (
    <>
    <View style={styles.container}>
      <YoutubePlayer
        videoId={url}
        initialPlayerParams={{
          start: start,
          end: end,
        }}
        ref={playerRef}
        height={'100%'}
        play={true}
        onChangeState={onStateChange}
        onReady={onReady}
      />
    </View>
    <ScrollView style={styles.scroll}
      scrollEnabled={scrollEnabled.current}
      contentContainerStyle={styles.content}
    >
      <MultiSlider
      min={0}
      max={duration}
      enableLabel={true}
      values={[startState, endState]}
      valuePrefix={'time'}
      minMarkerOverlapDistance={5}
      markerOffsetX={0}
      markerOffsetY={15}
      onValuesChangeStart={() => disableScroll()}
      onValuesChangeFinish={() => enableScroll()}
      enabledTwo={true}
      allowOverlap={false}
      customMarkerLeft={() => (<View style={{width: 10, height: 10, backgroundColor: 'red'}}/>)}
      customMarkerRight={() => (<View style={{width: 10, height: 10, backgroundColor: 'yellow'}}/>)}
      isMarkersSeparated={true}
      trackStyle={{backgroundColor: 'pink'}}
      markerStyle={{backgroundColor: 'red'}}
      selectedStyle={{backgroundColor: 'blue'}}
      />
      <Button
        title="log details"
        onPress={() => {
          console.log(duration)
        }}
      />
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16/9,
    width: '100%',
  },
  text: {
    color: '#C0C0B87F',
    textTransform: 'capitalize'
  },
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center'
  },
})

export default Video;