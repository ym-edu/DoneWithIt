import React from 'react';
import { RepsSet, RepsTarget, TimeSet, TimeTarget } from './';

export default selector = ({mode, reps, count, time}) => {
  switch(mode) {
    case 'r1':
      return <RepsSet reps={reps}/>;
      break;
    case 'r2':
      return <RepsTarget reps={reps}/>;
      break;
    case 't1':
      return <TimeSet count={count}/>;
      break;
    case 't2':
      return <TimeTarget count={count} time={time}/>;
      break;
    default:
      alert('NAN');
  }
}