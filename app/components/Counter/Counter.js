import React, { useState, useEffect } from 'react';
import { selector } from './'

function Counter({data, isPaused}) {
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((count) => {
      if(count === 0) {
        return count;
      }
      const timeLeft = count - 1000;

      return timeLeft;
    })
  }

  useEffect(() => {
    if(isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current)
  }, [isPaused])

  const minutesToMillis = (min) => min * 1000 * 60;
  const secondsToMillis = (sec) => sec * 1000;
  const totalMillis = minutesToMillis(data.min) + secondsToMillis(data.sec)

  const formatTime = (count) => count < 10 ? `0${count}` : count;

  const [millis, setMillis] = useState(totalMillis)
  const minutes = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  
  const count = `${formatTime(minutes)}:${formatTime(seconds)}`
  const time = `${formatTime(data.min)}:${formatTime(data.sec)}`

  return (
    selector(data, count, time)
  );
}

export default Counter;