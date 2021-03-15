import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { getYoutubeMeta } from 'react-native-youtube-iframe'

function Preview({item: {id, video: {url}}}) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    getYoutubeMeta(url).then(data => {
      setThumbnail(data.thumbnail_url);
    });
  }, [id]);

    return (
      <View style={styles.container}>
      <Text style={styles.text}>Next Exercise</Text>
      <View style={styles.card}>
        {/* <Text style={styles.text}>
          '{item.data.mode}' {item.title}
        </Text> */}
          <View style={{aspectRatio: 16/9, backgroundColor: 'black', height: 72, alignSelf: 'flex-start'}}>
            <Image style={{aspectRatio: 16/9}}
              resizeMode={'cover'}
              source={{
                uri: thumbnail ? thumbnail : 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'magenta',
    height: 96,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  card: {
    height: 72,
    width: '100%',
    backgroundColor: '#242626',
    // backgroundColor: 'chartreuse',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
})

export default Preview;