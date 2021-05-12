import React, { useContext } from 'react';

const VideoId = React.createContext();
const VideoIdUpdate = React.createContext();

export function useVideoId() {
  return useContext(VideoId);
}
export function useVideoIdUpdate() {
  return useContext(VideoIdUpdate);
}

export default function VideoIdProvider({ children }) {
  const [videoId, setVideoId] = React.useState('');

  const setValue = React.useMemo(() => {
    return {
      setVideoId: setVideoId,
      clearVideoIdState: () => setVideoId('')
    }
  })

  return (
    <VideoId.Provider value={videoId}>
      <VideoIdUpdate.Provider value={setValue}>
        {children}
      </VideoIdUpdate.Provider>
    </VideoId.Provider>
  )
}
