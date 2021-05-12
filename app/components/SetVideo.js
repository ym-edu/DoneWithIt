import react from "react";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Text } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import formatTime from '../temp/formatTime'

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
    setReady(!ready)
  }
  
  
  const onStateChange = useCallback((state) => {
    console.log(state)
    if(state === 'ended') {
      setReady(!ready)
    }
    //WARNING: without the duration dependancy, BEFORE & AFTER will continue to log duration as 0
    // console.log("BEFORE",duration)
    // if(duration > 0) return
    // console.log("AFTER",duration)

    if(state === 'playing' && duration <= 1) {
      // console.log('onStateChange', state)
      
      playerRef.current?.getDuration()
      .then(duration => {
        // console.log("Duration", duration)
        setDuration(Math.floor(duration))
        setEndState(Math.floor(duration))
      });
    }
  }, [ready, duration])

  useEffect(() => {
    playerRef.current.seekTo(startState, true) //Play video
    const load = setTimeout(() => {
      playerRef.current.seekTo(startState+1, true) //After 1s seekTo()
    }, 1300); //300 + compensation to look more seemless
    
    return () => clearTimeout(load)
  }, [ready])

  const onValuesChange = useCallback((state) => {
    playerRef.current.seekTo(state[0], true)
    setStartState(state[0])
    setEndState(state[1])
    setReady(!ready)
  }, [])

  return (
    <>
    <View style={styles.container}>
      <YoutubePlayer
        videoId={url}
        initialPlayerParams={{
          start: start,
          end: endState,
        }}
        ref={playerRef}
        height={'100%'}
        play={true}
        onChangeState={onStateChange}
        onReady={onReady}
        loop={true}
      />
    </View>
    <ScrollView style={styles.scroll}
      scrollEnabled={scrollEnabled.current}
      contentContainerStyle={styles.content}
    >
      <Text style={{color: 'white'}}>{formatTime(startState)}</Text>
      <MultiSlider
      min={0}
      max={duration}
      values={[startState, endState]}
      onValuesChange={onValuesChange}
      // enableLabel={true}
      // valuePrefix={'time'}
      minMarkerOverlapDistance={1}
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
      <Text style={{color: 'white'}}>{formatTime(endState)}</Text>
    
      <Button
        title="log details"
        onPress={() => {
          console.log("Duration", duration)
          console.log("startState", startState)
          console.log("endState", endState)
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