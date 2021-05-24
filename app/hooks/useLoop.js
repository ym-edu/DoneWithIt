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
  const [exerciseName, setExerciseName] = useState(null)
  const [videoId, setVideoId] = useState(null);
  const [duration, setDuration] = useState(null);

  const playerRef = useRef();
  const scrollEnabled = useRef(true);

  const [values, setValues] = useState([]);

  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const [data, setData] = useState(null);

  const getValue = {
    exerciseName: exerciseName,
    values: values,
    duration: duration,
    videoId: videoId,
    playerRef: playerRef,
    scrollEnabled: scrollEnabled,
    playing: playing,
    currentTime: currentTime,
    data: data,
  }

  const setValue = useMemo(() => {
    return({
      setExerciseName: setExerciseName,
      setVideoId: setVideoId,
      clearLoopState: () => {
        setVideoId('')
        setDuration(null)
        setValues([])
        setCurrentTime(0)
        setExerciseName(null)
      },
      setVideo: (id) => {
        setVideoId(id)
        setDuration(null)
        setValues([])
        setCurrentTime(0)
        setData(null)
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
      setData: setData,
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
