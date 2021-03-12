function minToMil(min) {
  return min * 60 * 1000
}

function secToMil(sec) {
  return sec * 1000
}

export default function getMil(min, sec) {
  return minToMil(min) + secToMil(sec)
}