# Assign Args

Like Function.prototype.bind,
but let's you assign farther-right arguments first,
incrementally assign properties on an object argument,
and overwrite previously assigned arguments.

# Installation
```sh
$ npm install assign-args
```

# Usage
```javascript
// How to require:
const assign = require('assign-args');
```

```javascript
test('assigning farther-right arguments first', () => {
  const y = (m, x, b) => m*x + b;
  const oneArg = assign(y, undefined, undefined, 3);
  const twoArgs = assign(oneArg, undefined, 2);

  expect(twoArgs(1)).toBe(5);
});

test('incrementally assigning properties on an object argument', () => {
  const y = ({ m, x }, b) => m*x + b;
  const oneArg = assign(y, undefined, 3);
  const twoArgs = assign(oneArg, { x: 2 });

  expect(twoArgs({ m: 1 })).toBe(5);
});

test('overwriting previously assigned args', () => {
  const y = ({ m, x }, b) => m*x + b;
  const withArgs = assign(y, { m: 2, x: 2 }, 5);
  expect(withArgs()).toBe(9);
  const withArgsRedone = assign(withArgs, { m: 3 }, 10);

  expect(withArgsRedone()).toBe(16);
});
```

## Binding context/this still works:

```javascript
const getFoo = function(...args) {
  return this.foo + args.join('');
};

test('binding context/this before', () => {
  const withCtx = getFoo.bind({ foo: 'bar' });
  const withCtxAndArg = assign(withCtx, 1);

  expect(withCtxAndArg()).toBe('bar1');
});

test('binding context/this between', () => {
  const withArg = assign(getFoo, undefined, 2);
  const withCtxAndArg = withArg.bind({ foo: 'bar' });
  const withCtxAnd2Args = assign(withCtxAndArg, 1);

  expect(withCtxAnd2Args()).toBe('bar12');
})

test('binding contet/this after', () => {
  const withArg = assign(getFoo, 1);
  const withCtxAndArg = withArg.bind({ foo: 'bar' });

  expect(withCtxAndArg()).toBe('bar1');
});
```
