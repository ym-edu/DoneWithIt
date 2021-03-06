const minutes = (min) => {
  if (min > 0) {
    return `${min} min `
  } else return ''
}

const seconds = (sec) => {
  if(sec > 0) {
    return `${sec} sec`
  } else return ''
}

export default (mode) => {
  switch(mode.current) {
    case 'repsFixed':
    case 'repsTarget':
      return `${mode[`${mode.current}`]} reps`;
    case 'timeFixed':
    case 'timeTarget':
      return mode[mode.current].min === 0 && mode[mode.current].sec === 0
      ? '∞'
      : `${minutes(mode[mode.current].min)}${seconds(mode[mode.current].sec)}`
    default:
      alert('NAN');
  }
}
