export default (data) => {
  switch(data.mode) {
    case 'r1':
    case 'r2':
      return `${data.reps} reps`;
    case 't1':
    case 't2':
      return (
        `${data.min === 0 ? '' : `${data.min} min `}${data.sec === 0 ? '' : `${data.sec} sec`}`
      )
    default:
      alert('NAN');
  }
}
