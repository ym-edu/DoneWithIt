export default function milToMin(mil) {
  return Math.floor(mil / 1000 / 60) % 60
}