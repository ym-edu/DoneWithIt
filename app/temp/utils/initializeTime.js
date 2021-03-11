import { formatTime, minToMil, secToMil } from './'

export default function initialize(exercise) {
  const { data: {mode, min, sec} } = exercise
  const mil = minToMil(min) + secToMil(sec)
  return (
    exercise.session = {
      isStarting: true,
      isFinished: false,
      isPaused: true,
      time: mode === 't1' ? mil : 0,
      count: mode === 't1' ? formatTime(min, sec) : formatTime(0,0),
    }
  )
}

