export default (wordsToJoin, maxlength) => {
  if (wordsToJoin < 2)
    throw new Error(
      'eleventy-nbsp-filter: first argument (words count) should be 2 or higher.'
    )

  if (!wordsToJoin || !maxlength)
    throw new Error(
      'eleventy-nbsp-filter: filter expects two number arguments.'
    )
  // build filter function
  return (value) => {
    const wordsArray = value.split(/\s/).reverse()

    // return when no spaces are present
    if (wordsArray.length === 1) return value

    // return value if last characters count exceeds limit
    let lastCharactersLength = 0
    for (let i = 0; i < wordsToJoin && i < wordsArray.length; i++)
      lastCharactersLength += wordsArray[i].length

    if (lastCharactersLength > maxlength) return value

    // reduce string adding &nbsp; characters
    return wordsArray.reverse().reduce((acc, item, index, array) => {
      if (index === 0) return item
      if (array.length - index < wordsToJoin) return `${acc}&nbsp;${item}`

      return acc + ` ${item}`
    }, '')
  }
}
