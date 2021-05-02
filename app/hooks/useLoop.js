import React, { createContext, useContext, useMemo, useRef, useState } from 'react';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format"; //Required

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
  const [duration, setDuration] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(null);
  const playerRef = useRef()
  
  const getValue = {
    duration: duration,
    start: start,
    end: end,
    videoId: videoId,
    playerRef: playerRef
  }

  const setValue = useMemo(() => {
    return({
      // setDuration: setDuration,
      // setStart: setStart,
      // setEnd: setEnd,
      setVideoId: setVideoId,
      clearLoopState: () => {
        setVideoId('')
        setEnd(null)
        setDuration(null)
        setStart(0)
      },
      setInitialParams: (videoDuration) => {
        setDuration(videoDuration)
        setEnd(videoDuration)
      },
      PTtoSeconds: (duration) => moment.duration(duration).format("s", {
        groupingSeparator: "",
      }),
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
