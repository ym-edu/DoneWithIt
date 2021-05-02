import React, { useCallback, useEffect } from "react";
import { Button, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { useLoop, useLoopUpdate } from '../hooks/useLoop';

function Video({url}) {
  const { playerRef, duration, start, end } = useLoop();
  const { PTtoSeconds, setInitialParams } = useLoopUpdate();

  const fetchVideo = async () => {
    const api = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${url}&key=AIzaSyCedwcitDUV0CLExJpuGf269YAzaInjgkA`
    const response = await fetch(api);
    const json = await response.json();
    return json
  }

  useEffect(() => {
    console.log('Fetching...')
    fetchVideo().then(result => {
      const PT = result.items[0].contentDetails.duration
      const videoDuration = parseInt(PTtoSeconds(PT), 10)
      setInitialParams(videoDuration)
    })

    const interval = setInterval(() => {
      playerRef.current?.getCurrentTime()
      .then(currentTime => {
        const time = Math.floor(currentTime)
        if((time >= end || time < start) && duration > 0) {
          playerRef.current?.seekTo(start, true)
        }
      })
    }, 250); //WARNING: a low enough value will return [MaxListenersExceededWarning] - e.g. for 100, 11 getCurrentTime listeners added

    return () => clearInterval(interval);
  }, [])

  const onStateChange = useCallback((state) => {
    if(state === "ended") {
      console.log(state)
      playerRef.current?.seekTo(start, true)
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
              console.log("duration", {getDuration})
              console.log("end", end)
              console.log("start", start)
            }
          );
        }}
      />
    </>
  );
}

export default Video;