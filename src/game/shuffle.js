export function shuffle(items) {
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = copy[index]

    copy[index] = copy[randomIndex]
    copy[randomIndex] = currentItem
  }

  return copy
}