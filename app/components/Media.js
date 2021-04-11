import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getYoutubeMeta } from 'react-native-youtube-iframe';

import { useIcon } from '../layout';

function Media({ source, square = false }) {
  const Icon = useIcon()

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if(!source) return;
    const fetchMedia = async () => {
      getYoutubeMeta(source).then(data => {
        setThumbnail(data.thumbnail_url);
      });
    }
    fetchMedia()
  }, []);

  function Thumbnail() {
    return (
      <View style={[styles.thumbnail, !square && {width: null, height: '100%'}]}>
       <Image
         style={{aspectRatio: 16/9}}
         resizeMode='cover'
         source={{uri: thumbnail ? thumbnail : null}}
       />
      </View>
    )
  }

  return (
    <View style={square && styles.container}>
      {source ? <Thumbnail/>
      : square ? <Icon name='media-empty' size={40}/>
        : <Thumbnail/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    height: '100%',
    backgroundColor: '#242626',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbnail: {
    aspectRatio: 16/9,
    width: '100%',
    backgroundColor: '#1D1E1E',
  },
})

export default Media;
