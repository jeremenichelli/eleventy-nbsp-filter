# eleventy-nbsp-filter

[![Build Status](https://travis-ci.org/jeremenichelli/eleventy-nbsp-filter.svg?branch=master)](https://travis-ci.org/jeremenichelli/eleventy-nbsp-filter)

🛸 Filter for Eleventy to replace spaces between words with `&nbsp;` characters.

## Motivation

Sometimes it happens that titles move to a next line leaving one short word alone, one solution is to add a `&nbsp;` entity instead of a normal space character, but doing this on your content files might not be ideal since then you need to escape that character in other places you consume that data.

I found myself _polluting_ my titles with this character to then remove it, what if I just had a filter where given a title and a certain safe length of characters this gets done automatically, preserving the title as it is? This is why `eleventy-nbsp-filter` exists.

## Install

```sh
# npm
npm i eleventy-nbsp-filter --save-dev

# yarn
yarn add eleventy-nbsp-filter --dev
```

## Add the filter

Include the filter in your [Eleventy](//11ty.io) project.

```js
// .eleventy.js
const nbspFilter = require('eleventy-nbsp-filter')

const numberOfWordsToJoin = 2
const maxLength = 10

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('nbsp', nbspFilter(numberOfWordsToJoin, maxLength))
}
```

The filter will add the last two words of a tet value, only if they don't pass the amount of ten characters together. You can pass any configuration that adapts to your needs.

## Apply it

```liquid
<h1>{{ page.title | nbsp }}</h1>
```

And that's it! Keep reading to understand why you need to pass some numbers to the filter.

## How it works

The filter will require you to define how many words you want to join and the maximum number of characters which is safe to join, this is in order to avoid text to overflow the viewport.

So, let's say you add a filter with the config exactly like the example above.

If the filter receives this text, `There is a place where the sidewalk ends` it will bail out on adding the `&nbsp;` character because we said we wanted `2` words to be joint, but those together are `12` characters and we passed `10` as the maximum length.

Now if we pass this text, `We'll walk with a walk that is measured and slow`, then the result will be `We'll walk with a walk that is measured and&nbsp;slow` because the last two words sum to `7` characters, then the filter acts.

The config is an extra weight-lifting you need to do, but provides a safer and more adaptable distribution of itself to better adjust your needs regarding this super nitpicky action.

_Text excerpts are taken from Shel Silverstein's poem "Where the Sidewalk Ends"._

## Contributing

To contribute [Node.js](//nodejs.org) and [yarn](//yarnpkg.com) are required.

Before commit make sure to follow [conventional commits](//www.conventionalcommits.org) specification and check all tests pass by running `yarn test`.
