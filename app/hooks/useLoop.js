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
  const [videoId, setVideoId] = useState(null);
  const [duration, setDuration] = useState(null);

  const playerRef = useRef();
  const scrollEnabled = useRef(true);

  const [values, setValues] = useState([]);

  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  const getValue = {
    values: values,
    duration: duration,
    videoId: videoId,
    playerRef: playerRef,
    scrollEnabled: scrollEnabled,
    playing: playing,
    currentTime: currentTime,
    keyboardVisible: keyboardVisible,
  }

  const setValue = useMemo(() => {
    return({
      setVideoId: setVideoId,
      clearLoopState: () => {
        setVideoId('')
        setDuration(null)
        setValues([])
        setCurrentTime(0)
      },
      setDuration: setDuration,
      PTtoSeconds: (duration) => moment.duration(duration).format("s", {
        groupingSeparator: "",
      }),
      setValues: setValues,
      setPlaying: setPlaying,
      setCurrentTime: setCurrentTime,
      formatSeconds: (time) => {
        const formatedTime = moment.duration(time, "seconds").format("hh:mm:ss").padStart(4, "0:0");
        return formatedTime
      },
      setKeyboardVisible: setKeyboardVisible,
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
