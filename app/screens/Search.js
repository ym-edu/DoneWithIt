import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import VideoCard from '../components/VideoCard';
import { useSearch, useSearchUpdate } from '../hooks/useSearch'

function Search({ navigation }) {
  const { query, searchResults, loading } = useSearch();
  const { setVideoId, setQuery, fetchVideos, resetResults } = useSearchUpdate();

  const handleEnd = (query) => {
    fetchVideos(query)
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
          onSubmit={(event) => {
            setQuery(event)
            resetResults()
            fetchVideos(event)
          }}
          />
          <Spacer mH={32}/>
          {/* Helps center SearchBar within header*/}
        </View>
        <View style={{flex: 1, paddingTop: 16, paddingHorizontal: 16}}>
          <FlatList style={styles.flatlist}
            // showsVerticalScrollIndicator={true}
            data={searchResults}
            // This helps in case video instances repeat accross multiple pages
            keyExtractor={(item, index) => item.id.videoId + index}
            onEndReached={() => handleEnd(query)}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <VideoCard
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                subtitle={item.snippet.channelTitle}
                onPress={() => {
                  setVideoId(item.id.videoId)
                  navigation.pop()
                }}
              />
            )}
            ItemSeparatorComponent={() => <Spacer mV={16}/>}
            ListFooterComponent={() =>
            <View style={{height: 64, justifyContent: 'center'}}>
              { loading && <ActivityIndicator size={Platform.OS === 'ios' ? 'small' : 'large'} color="#C8C0B8" animating={true}/> }
            </View>
          }
            showsVerticalScrollIndicator={true}
            indicatorStyle={'white'} //TODO: Consider making an xml search bar for android - https://stackoverflow.com/questions/54752669/change-color-of-scrollview-indicator
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
  }
})

export default Search;
