/**
 * Format functions take in a time/date input and output a string or object of strings to be used for client-side display
*/

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thurseday',
  'friday',
  'saturday'
];

  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ];

export const formatMD = (DATE) => {
  const day = days[DATE?.getDay()];
  const month = months[DATE?.getMonth()];
  const date = DATE?.getDate().toString();
  
  const modules = {
    month,
    abrMonth: month?.substr(0,3),
    day,
    abrDay: day?.substr(0,3),
    date,
  }

  return modules
}

export default { formatMD }
