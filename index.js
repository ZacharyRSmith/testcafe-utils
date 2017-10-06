/**
 * @module testcafe-utils.
 *
 * Utils for testcafe.
 *
 * @flow
 */

/**
 * Runs @fn(n) for each n matching @selector.
 *
 * Runs in series, not parallel.
 *
 * Example usage:
 * await expectEach(
 *   mySelector,
 *   n => t.expect(mySelector.nth(n).innerText).eql("foo", `Failed on n '${n}'`)
 * );
 */
async function expectEach(selector/*: { count: () => Promise<number> } */, fn/*: (number) => mixed? */) {
  const count = await selector.count;
  for (let i = 0; i < count; ++i) {
    await fn(i);
  }
}

module.exports = {
  expectEach
};
