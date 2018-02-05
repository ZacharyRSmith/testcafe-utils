# TestCafe Utils

Utils for TestCafe.

## Current methods:

#### async tu.expectEach()
* Runs @fn(n) for each n matching @selector.
*
* Runs in series, not parallel.
*
* Example usage:

* await expectEach(
*   mySelector,
*   n => t.expect(mySelector.nth(n).innerText).eql("foo", `Failed on n '${n}'`)
* );

# Installation
```sh
$ npm install testcafe-utils
```

# Usage
```javascript
const { Selector } = require('testcafe');
const tu = require('testcafe-utils');

const baseURL = 'http://www.imdb.com/title/tt0092400/ratings?ref_=tt_ov_rt';

fixture `IMDB`
  .page `${baseURL}`;

const mySelector = Selector('#main .title-ratings-sub-page table:nth-of-type(2) tr');

test('it', async t => {
  await tu.expectEach(mySelector, n => t.expect(mySelector.nth(n).innerText).match(/all/gi, `Failed on n '${n}'.`));
})
```
