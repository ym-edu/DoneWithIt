import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

function Video({item:{id}}) {
  const data = {
    url: "ZfawH9NsTtI",
    start: 194,
    end: 199,
  }

  const [play, setPlay] = useState(true)
  const [change, setChange] = useState(false);
  const playerRef = useRef()

  useEffect(() => {
    playerRef.current.seekTo(194,true)
  }, [id, change])

  const onStateChange = useCallback((state) => {
    setChange(change)

    if (state === "ended") {
      
      setChange(!change)
    }
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        videoId={data.url}
        initialPlayerParams={{
          start: data.start,
          end: data.end,
        }}
        ref={playerRef}
        height={'100%'}
        play={play}
        onChangeState={onStateChange}
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