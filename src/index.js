export default (wordsToJoin, maxlength) => {
  // throw when arguments aren't correct
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
    const wordsArray = value.split(/\s/)

    // return when no spaces are present
    if (wordsArray.length < 2) return value

    // return value if last characters count exceeds limit
    let lastCharactersLength = 0
    let i = Math.max(0, wordsArray.length - wordsToJoin)
    for (; i < wordsArray.length; i++)
      lastCharactersLength += wordsArray[i].length

    if (lastCharactersLength > maxlength) return value

    // reduce string adding &nbsp; characters
    return wordsArray.reduce((acc, item, index, array) => {
      if (index === 0) return item
      if (array.length - index < wordsToJoin) return `${acc}&nbsp;${item}`

      return acc + ` ${item}`
    }, '')
  }
}
