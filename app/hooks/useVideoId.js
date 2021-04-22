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
  const [url, setURL] = React.useState('');

  return (
    <VideoId.Provider value={url}>
      <VideoIdUpdate.Provider value={setURL}>
        {children}
      </VideoIdUpdate.Provider>
    </VideoId.Provider>
  )
}
