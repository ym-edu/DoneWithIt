import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import VideoCard from '../components/VideoCard';
import { useVideoIdUpdate } from '../hooks/useVideoId'

function Search({ navigation }) {
  const getVideo = useVideoIdUpdate();
  const [searchResults, setSearchResults] = useState([]);

  const fetchVideos = async (query) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&type=video&key=AIzaSyCedwcitDUV0CLExJpuGf269YAzaInjgkA`

    const response = await fetch(url);
    const json = await response.json();
    setSearchResults(json.items)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon}
          onPress={() => navigation.pop()}
          >
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableOpacity>
          <SearchBar
          fill={false}
          placeholder="Search Youtube"
          onSubmit={fetchVideos}
          />
          <Spacer mH={32}/>
          {/* Helps center SearchBar within header*/}
        </View>
        <View style={{flex: 1, paddingTop: 16, paddingHorizontal: 16}}>
          <FlatList style={styles.flatlist}
            data={searchResults}
            keyExtractor={(item) => item.id.videoId}
            renderItem={({ item }) => (
              <VideoCard
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                subtitle={item.snippet.channelTitle}
                onPress={() => {
                  getVideo(item.id.videoId)
                  navigation.pop()
                }}
              />
            )}
            ItemSeparatorComponent={() => <Spacer mV={8}/>}
            ListFooterComponent={() =>
            <Spacer mV={64}/>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 0,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2 //Level custom backbutton for this screen with original stack navigator backbutton
  },
  headerIcon: {
    width: 32
  },
  flatlist: {
    flex: 1,
    // backgroundColor: 'pink',
  }
})

export default Search;
