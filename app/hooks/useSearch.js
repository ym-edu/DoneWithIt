import React, { useContext } from 'react';

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
  const [loading, setLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [pageToken, setPageToken] = React.useState('');
  const [requestCap, setRequestCap] = React.useState(0);
  const [videoId, setVideoId] = React.useState('');

  const getValue = {
    query: query,
    loading: loading,
    searchResults: searchResults,
    pageToken: pageToken,
    requestCap: requestCap,
    videoId: videoId,
  }

  const setValue = React.useMemo(() => {
    return ({
      onSubmit: (query) => {
        setQuery(query)
        setRequestCap(0)
        setPageToken('')
        setSearchResults([])
        fetchVideos({query: query, requestCap: 0, pageToken: ''}).then(result => {
          console.log("onSubmit: ", result.nextPageToken)
          setSearchResults(result.items)
          setPageToken(result.nextPageToken === undefined ? '' : result.nextPageToken)
          setRequestCap(prevState => prevState + 1)
        })
      },
      onEndReached: () => {
        console.log(requestCap)
        if(requestCap >= 2) return
        fetchVideos().then(result => {
          // console.log("onEndReached: ", result.items)
          setSearchResults(prevState => [...prevState, ...result.items])
          setPageToken(result.nextPageToken === undefined ? '' : result.nextPageToken)
          setRequestCap(prevState => prevState + 1)
        })
      },
      setLoading: setLoading,
      setVideoId: setVideoId,
      clearState: () => {
        setVideoId('')
      },
    })
  })
  
// ======================================================================================

  const fetchVideos = async (props) => {
    setLoading(true)
    console.log(props && 'Have Props')
    // console.log("QUERY: ",  props ? props.query : query)
    // console.log("REQUEST CAP", props ? props.requestCap : requestCap)
    // console.log("PAGE TOKEN", props ? props.pageToken : pageToken)
    const token = !props ? `&pageToken=${pageToken}` : ''
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${props ? props.query : query}&type=video&key=AIzaSyCedwcitDUV0CLExJpuGf269YAzaInjgkA${pageToken && token}`
    console.log(url)

    const response = await fetch(url);

    const json = await response.json();

    return json
  }

  // React.useEffect(() => {
  //   setLoading(false)
  // }, [searchResults])

  return (
    <Search.Provider value={getValue}>
      <SearchUpdate.Provider value={setValue}>
        {children}
      </SearchUpdate.Provider>
    </Search.Provider>
  )
}
