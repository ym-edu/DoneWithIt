import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

function Video({url='DN0gAQQ7FAQ'}) {
  const playerRef = useRef();
  const [playing, setPlaying] = useState(true);
  const [playerState, setPlayerState] = useState('');

  const togglePlaying = useCallback(() => {
    return !playing
  }, [playing])

  const onStateChange = useCallback((state) => {
    setPlayerState(state)
  }, [])

  useEffect(() => {
    if(playerState === "ended" || playerState === "paused") {
      setPlaying(togglePlaying())
    }
  }, [playerState])

  useEffect(() => {
    if(playerState === "ended" || playerState === "paused") {
      setPlaying(true)
    }
  }, [togglePlaying])

 
  return (
    <>
    <View style={styles.container}>
      <YoutubePlayer
      videoId={url}
      height={'100%'}
      play={playing}
      ref={playerRef}
      onChangeState={onStateChange}
      initialPlayerParams={{
        start: 2,
        end: 4,
      }}
      />
    </View>
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