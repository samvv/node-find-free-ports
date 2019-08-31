
This is a very simple package that allows developers to find free ports
on the local system. Unlike most other "find-free-port" utilities, this library
allows scanning for multiple free ports at once, making sure that there are no
doubles in the result.

```
npm i find-free-ports
```

## Usage

```js
const findFreePorts = require('find-free-ports');

async function init() {
  const [a, b, c, d] = await findFreePorts(4);
  // now do something interesting with the new ports ...
}
```

## Development

We use [TypeScript](https://www.typescriptlang.org/) to check the code for human mistakes.

```
tsc --watch
```

You can run the tests with the following command:

```
npm test
```

⚠️ The tests may use a lot of resources so make sure your computer is up for the
task. Also, due to race conditios with other applications that cannot be
avoided, the tests may falsly fail or succeed in some cases. Be sure to
double-check any changes you make.

## Similar Packages

 - [portfinder](https://www.npmjs.com/package/portfinder)
 - [get-port](https://www.npmjs.com/package/get-port)
 - [find-free-port](https://www.npmjs.com/package/find-free-port)
 - [freeport](https://www.npmjs.com/package/freeport)

## License

The MIT License
