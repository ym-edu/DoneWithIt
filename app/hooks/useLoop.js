import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

const Loop = createContext();
const LoopUpdate = createContext();

export function useLoop() {
  return useContext(Loop)
}
export function useLoopUpdate() {
  return useContext(LoopUpdate)
}

export default function LoopProvider({children}) {
  // const url = 'ZfawH9NsTtI'
  const [videoId, setVideoId] = useState(null)
  const playerRef = useRef();
  const [duration, setDuration] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(null);

  const getValue = {
    playerRef: playerRef,
    duration: duration,
    start: start,
    end: end,
    videoId: videoId,
  }

  const setValue = useMemo(() => {
    return({
      setDuration: setDuration,
      setStart: setStart,
      setEnd: setEnd,
      setVideoId: setVideoId,
      clearVideoId: () => {
        setVideoId('')
      }
    })
  })

  return (
    <Loop.Provider value={getValue}>
      <LoopUpdate.Provider value={setValue}>
        {children}
      </LoopUpdate.Provider>
    </Loop.Provider>
  );
}
