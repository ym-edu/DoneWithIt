/**
 * Format functions take in a DATE || DURATION and return a string || object of strings to be used for client-side display
*/

export const formatAMPM = (DATE) => {
  let hours = DATE.getHours();
  hours = hours % 12 || 12;
  let minutes = DATE.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';

  hours = hours.toString();
  minutes = minutes.toString();
  
  const modules = {
    hours,
    padHours: hours.padStart(2, '0'),
    minutes,
    padMinutes: minutes.padStart(2, '0'),
    period,
    displayAMPM: hours + ':' + minutes.padStart(2, '0') + ' ' + period,
  }

  return modules
}

export const formatHHMMSS = (DURATION) => {
  let hours = Math.floor((DURATION/1000/3600) % 24).toString();
  let minutes = Math.floor((DURATION/1000/60) % 60).toString();
  let seconds = Math.floor((DURATION/1000) % 60).toString();

  let displayHHMMSS
  if (hours > 0) {
    displayHHMMSS = hours + ':' + minutes.padStart(2, 0) + ':' + seconds.padStart(2, '0');
  } else if (minutes > 0) {
    displayHHMMSS = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
  } else if (seconds > 0) {
    displayHHMMSS = minutes + ':' + seconds.padStart(2, '0');
  } else {
    displayHHMMSS = '--:--';
  }

  const modules = {
    hours,
    padHours: hours.padStart(2, '0'),
    minutes,
    padMinutes: minutes.padStart(2, '0'),
    seconds,
    padSeconds: seconds.padStart(2, '0'),
    displayHHMMSS,
  }

  return modules
}

const convertPT = (DURATION) => {
  // RegExp pattern for an array containing full PT string, and the corresponding values preceeding H, M, S, if any => ["PT...", "num", "num", "num"]
  const regExp = /PT(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/;

  const values = DURATION.match(regExp)
  .slice(1) // Remove first element (PT string)
  .map(value => !value ? 0 : parseInt(value, 10)) // Replace undefined values with 0

  const sum = values
  .reverse() // Reverse time units HMS --> SMH
  .reduce((accumulator, value, index) => (
    /** Increment an accumulator with the product of the current element and...
     * 1 for seconds to seconds === seconds * 60^0 where 0 == index
     * 60 for minutes to seconds === minutes * 60^1 where 1 == index
     * 36000 for hours to seconds === hours * 60^2 where 2 == index
     * Subsequently multiply total seconds by 1000 to obtain milliseconds
    */
    accumulator += value * 60 ** index
  ), 0)

  const modules = {
    hours: values[2],
    minutes: values[1],
    seconds: values[0],
    totalSeconds: sum,
    totalMiliseconds: sum * 1000
  }

  return modules
}

export default { formatAMPM, formatHHMMSS, convertPT }
