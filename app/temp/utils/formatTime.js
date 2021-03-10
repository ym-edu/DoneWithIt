export default function formatTime(min, sec) {
  return`${min > 10 ? min : `0${min}`}:${sec > 10 ? sec : `0${sec}`}`
}