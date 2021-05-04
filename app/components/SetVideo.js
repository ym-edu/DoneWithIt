import React, { useCallback, useEffect } from "react";
import { Button, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { useLoop, useLoopUpdate } from '../hooks/useLoop';

function Video({url}) {
  const { playerRef, duration, values } = useLoop();
  const { PTtoSeconds, setDuration, setValues } = useLoopUpdate();

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
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      playerRef.current?.getCurrentTime()
      .then(currentTime => {
        // console.log("Values from listener", values) // Only logs when slider has detected changes
        const time = Math.floor(currentTime)
        if((time < values[0] || time >= values[1]) && duration > 0) {
          playerRef.current?.seekTo(values[0], true)
        }
      })
    }, 500); //WARNING: a low enough value will return [MaxListenersExceededWarning] - e.g. for 100, 11 getCurrentTime listeners added

    return () => clearInterval(interval);
  }, [values])

  const onStateChange = useCallback((state) => {
    if(state === "ended") {
      console.log("Player state", state)
      playerRef.current?.seekTo(values[0], true)
    }
  }, [])

  return (
    <>
    <View style={{aspectRatio: 16/9, width: '100%'}}>
      {duration && <YoutubePlayer
      videoId={url}
      height={'100%'}
      ref={playerRef}
      play={true}
      onChangeState={onStateChange}
      />}
    </View>
      <Button
        title="log details"
        onPress={() => {
          playerRef.current?.getDuration().then(
            getDuration => {
              console.log("Duration", {getDuration})
              console.log("Values", values)
            }
          );
        }}
      />
    </>
  );
}

export default Video;