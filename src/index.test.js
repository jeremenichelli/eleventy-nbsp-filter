import identity from '.'
import test from 'ava'

test('identity function return same value', (t) => {
  t.is(identity(1), 1)
})
