import React, { useContext, useEffect } from 'react';

const Search = React.createContext();
const SearchUpdate = React.createContext();

export function useSearch() {
  return useContext(Search);
}
export function useSearchUpdate() {
  return useContext(SearchUpdate);
}

export default function SearchProvider({ children }) {
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [videoId, setVideoId] = React.useState('');
  const [pageToken, setPageToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [requestCap, setRequestCap] = React.useState(0);

  const getValue = {
    videoId: videoId,
    query: query,
    pageToken: pageToken,
    searchResults: searchResults,
    loading: loading,
    requestCap: requestCap,
  }

// ======================================================================================

const fetchVideos = async (query) => {
  console.log("IN FUNCTION", requestCap)

  if(requestCap >= 2) return
  
  console.log("Fetching: ", query)

  setLoading(true)

  const token = `&pageToken=${pageToken}`
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${query}&type=video&key=AIzaSyCedwcitDUV0CLExJpuGf269YAzaInjgkA${pageToken && token}`

  console.log("URL", url)

  const response = await fetch(url);
  const json = await response.json();

  setSearchResults(prevState => {
    return [...prevState, ...json.items]
  });

  setRequestCap(prevState => prevState + 1)


  if(json.nextPageToken) setPageToken(json.nextPageToken)


  console.log('END', json.nextPageToken)
}

  useEffect(() => {
    setLoading(false)
  }, [searchResults])

  const setValue = React.useMemo(() => {
    return {
      setVideoId: setVideoId,
      setQuery: setQuery,
      fetchVideos: (query) => {
        fetchVideos(query)
      },
      clearState: () => {
        setQuery('')
        setSearchResults([])
        setVideoId('')
        setPageToken('')
        setLoading(false)
        setRequestCap(0)
      },
      resetResults: () => {
        setSearchResults([])
        setRequestCap(0)
        setPageToken('')
      }
    }
  })

  return (
    <Search.Provider value={getValue}>
      <SearchUpdate.Provider value={setValue}>
        {children}
      </SearchUpdate.Provider>
    </Search.Provider>
  )
}
