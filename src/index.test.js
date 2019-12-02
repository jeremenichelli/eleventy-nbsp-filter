import nbspFilter from '.'
import test from 'ava'

test('returns a filter function', (t) => {
  t.is(typeof nbspFilter(2, 5), 'function')
})

test('does not add nbsp character when characters limit exceeds', (t) => {
  const filter = nbspFilter(2, 10)
  const testString = `There is a place where the sidewalk ends`
  const result = `There is a place where the sidewalk ends`
  t.is(filter(testString), result)
})

test('adds nbsp character', (t) => {
  const filter = nbspFilter(2, 10)
  const testString = `We'll walk with a walk that is measured and slow`
  const result = `We'll walk with a walk that is measured and&nbsp;slow`
  t.is(filter(testString), result)
})

test('adds nbsp character for more than two words', (t) => {
  const filter = nbspFilter(3, 12)
  const testString = `On the planet Mars, they have clothes just like ours`
  const result = `On the planet Mars, they have clothes just&nbsp;like&nbsp;ours`
  t.is(filter(testString), result)
})

test('does not act when no spaces are present', (t) => {
  const filter = nbspFilter(2, 10)
  const testString = `Silverstein`
  const result = `Silverstein`
  t.is(filter(testString), result)
})

test('adds nbsp character when words count is lower than config', (t) => {
  const filter = nbspFilter(3, 20)
  const testString = `...And slow`
  const result = `...And&nbsp;slow`
  t.is(filter(testString), result)
})

test('throws when words count is lower than 2', (t) => {
  t.throws(() => nbspFilter(1, 20))
})

test('throws when expected arguments are not provided', (t) => {
  t.throws(() => nbspFilter(1))
})
