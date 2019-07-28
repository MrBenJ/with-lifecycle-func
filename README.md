# with-lifecycle-func

### Add a before and after logic to _any_ function

* Zero Dependencies
* Minimum Node version: `v8.x.x`
* Written in pure JS
* Allows passing of arguments to the original and `after` function for proper cleanup.

## Installation
`npm install --save with-lifecycle-func`

## Usage and example
```js
const withLifecycle = require('with-lifecycle-func');

const sayHelloTo = friend => {
  console.log(`Hello ${friend}!`);
};

const before = () => {
  console.log('Looking for friend...');
  console.log('Seeing friend...');
  console.log('Contemplating existence of friend...');
  console.log('Notice friend!');
  console.log('Frantically approach friend with interpretive dance!');
};

const after = () => {
  console.log('Friend has been sucessfully greeted!');
  console.log('Return to take a nice nap.');
}

const findAndSayHelloTo = withLifecycle({
  before,
  after
})(sayHelloTo);

findAndSayHelloTo('Alex');
  // 'Looking for friend...'
  // 'Seeing friend...'
  // 'Contemplating existence of friend...'
  // 'Notice friend!'
  // 'Frantically approach friend with interpretive dance!
  // 'Hello Alex!
  // 'Friend has been sucessfully greeted!'
  // 'Return to take a nice nap.'
```

## Params and stuff

Write me....


## A more super serious example

### Start an express server, make some requests to it, then close the server

```js
const withLifecycle = require('with-lifecycle-func');
const express = require('express');
const fetch = require('isomorphic-fetch');

const app = express();

const before = () => {
  app.get('/', (req, res) => {
    res.send({ "hello": "world" });
  });

  const server = app.listen(9002, () => {
    console.log("listening on port 9002");
  });
  return server;
}

const fn = async () => {
  const response = await fetch('http://127.0.0.1:9002/');
  const json = await response.json();
  console.log(json);
}

const after = server => {
  console.log('done');
  server.close();
}

const finito = withLifecycle({
  before,
  after
})(fn);

finito();

// Output:
// listening on port 9002
// { "hello": "world" }
// done

```
This example also shows off how you can pass arguments created in `before` to your function, and the `after` function, like the `server` created by express.
