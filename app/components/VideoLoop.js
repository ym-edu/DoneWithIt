import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from '@react-navigation/native'

function VideoLoop({ video: { url, startTimeSec, endTimeSec } }) {
  const playerRef = useRef();
  const [playerReady, setPlayerReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(isFocused)
    let interval;

    if(playerReady) {
      interval = setInterval(() => {
        playerRef.current?.getCurrentTime()
        .then(currentTime => {
          // console.log("Values from listener", values) // Only logs when slider has detected changes
          const time = Math.floor(currentTime)
          // setCurrentTime(time)
          if((time < startTimeSec || time >= endTimeSec)) {
            playerRef.current?.seekTo(startTimeSec, true)
          }
        })
      }, 200);
    }

    return () => clearInterval(interval);
  }, [url, playerReady])

  const onStateChange = useCallback((state) => {
    if(state === "ended") {
      setPlaying(false)
      playerRef.current?.seekTo(startTimeSec, true)
      setPlaying(true)
    }
  }, [])

  const onReady = useCallback(() => {
    setPlaying(true)
    setPlayerReady(true)
  }, [])

  return (
    <>
      <View style={{aspectRatio: 16/9, width: '100%', backgroundColor: '#1D1E1E'}}>
        {isFocused &&
          <YoutubePlayer
            videoId={url}
            height={'100%'}
            ref={playerRef}
            play={playing}
            onChangeState={onStateChange}
            onReady={onReady}
          />}
      </View>
    </>
  );
}

export default VideoLoop;