import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

function Video({ item:{ video:{url, start, end} } }) {
  const playerRef = useRef();
  const [ready, setReady] = useState(false)

  function onReady() {
    setReady(!ready)
  }

  const onStateChange = useCallback((state) => {
    if(state === 'ended') {
      setReady(!ready)
    }
  }, [ready])

  useEffect(() => {
    //TODO: Figure out how to play video (load) and seekTo when loaded; A conditional if possible: if(loaded) seekTo
    playerRef.current.seekTo(start, true) //Play video
    const load = setTimeout(() => {
      playerRef.current.seekTo(start+1, true) //After 1s seekTo()
    }, 1300); //300 + compensation to look more seemless
    
    return () => clearTimeout(load)
  }, [ready])

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