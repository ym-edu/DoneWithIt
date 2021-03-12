export default function initializeReps(exercise) {
  const { data: {mode, reps} } = exercise
  return (
    exercise.session = {
      isStarting: true,
      isFinished: false,
      count: mode === 'r1' ? reps : 0,
    }
  )
}

