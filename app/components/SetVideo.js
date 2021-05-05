import React, { useCallback, useEffect, useState } from "react";
import { View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { useLoop, useLoopUpdate } from '../hooks/useLoop';
import TextButton from '../components/TextButton';

function Video({url, navigation}) {
  const { playerRef, duration, values, playing } = useLoop();
  const { PTtoSeconds, setDuration, setValues, setPlaying, setCurrentTime } = useLoopUpdate();

  const [playerReady, setPlayerReady] = useState(false)
  
  const fetchVideo = async () => {
    console.log('Fetching...')

    const api = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${url}&key=AIzaSyCedwcitDUV0CLExJpuGf269YAzaInjgkA`
    const response = await fetch(api);
    const json = await response.json();
    return json
  }

  useEffect(() => {
    fetchVideo().then(result => {
      const PT = result.items[0].contentDetails.duration
      const videoDuration = parseInt(PTtoSeconds(PT), 10) - 1 // API vs OEmbed differs by 1; This 1 second can prevent video from ever reaching end as slider range will not include the end second.
      setDuration(videoDuration)
      setValues([0, videoDuration])

      console.log("Duration", videoDuration)
    })
  }, [url])

  useEffect(() => {
    let interval;

    if(playerReady) { //Fixes MaxListenersWarning
      interval = setInterval(() => {
        playerRef.current?.getCurrentTime()
        .then(currentTime => {
          // console.log("Values from listener", values) // Only logs when slider has detected changes
          const time = Math.floor(currentTime)
          setCurrentTime(time)
          if((time < values[0] || time >= values[1]) && duration > 0) {
            playerRef.current?.seekTo(values[0], true)
          }
        })
      }, 200); //WARNING: a low enough value will return [MaxListenersExceededWarning] - e.g. for 100, 11 getCurrentTime listeners added
    }

    return () => clearInterval(interval);
  }, [values, playerReady])

  const onStateChange = useCallback((state) => {
    if(state === "ended") {
      console.log("Player state", state)
      playerRef.current?.seekTo(values[0], true)
    }
  }, [])

  const onReady = useCallback(() => {
    setPlaying(true)
    setPlayerReady(true)
  }, [])

  return (
    <>
      <View style={{aspectRatio: 16/9, width: '100%'}}>
        {duration && <YoutubePlayer
        videoId={url}
        height={'100%'}
        ref={playerRef}
        play={playing}
        onChangeState={onStateChange}
        onReady={onReady}
        />}
      </View>
      <TextButton style={{backgroundColor: '#1D1E1EDD', position: 'absolute', top: 0, right: 0, padding: 4}}
        onPress={() => {
          navigation.navigate("Search")
          setPlaying(false)
        }}>
        Change Video
      </TextButton>
    </>
  );
}

export default Video;