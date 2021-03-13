import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

function Video({ item:{ video:{url, start, end} } }) {
  const playerRef = useRef();
  // const ready = useRef(false) //READY
  const [ready, setReady] = useState(false) //READY

  function onReady() {
    // ready.current = !ready.current //READY
    setReady(!ready) // READY
  }

  const onStateChange = useCallback((state) => {
    if(state === 'ended') {
      // ready.current = !ready.current //READY
      setReady(!ready) //READY
    }
  // }, [ready.current]) //READY
  }, [ready]) //READY

  useEffect(() => {
    //TODO: Figure out how to play video (load) and seekTo when loaded; A conditional if possible: if(loaded) seekTo
    playerRef.current.seekTo(start, true) //Play video
    setTimeout(() => {
      playerRef.current.seekTo(start+1, true) //After 1s seekTo()
    }, 1300); //300 + compensation to look more seemless
  // }, [ready.current]) //READY
  }, [ready]) //READY

  return (
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
})

export default Video;