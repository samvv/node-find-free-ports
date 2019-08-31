
This is a very small package that allows developers to find free ports
on the local system. Unlike most other "find-free-port" utilities, this library
allows scanning for multiple free ports at once, making sure that there are no
doubles in the result.

This library has been benchmarked and parallelises the port checks using a
customisable number of workers for optimal performance.

🔍 Found an issue? Please let me know in the [issue tracker][1] and we'll get
it fixed ASAP.

[1]: https://github.com/samvv/node-find-free-ports/issues

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

We use [TypeScript](https://www.typescriptlang.org/) to check for human mistakes.

```
tsc --watch
```

You can run the tests with the following command:

```
npm test
```

⚠️ The tests may use a lot of resources so make sure your computer is up for the
task. Also, due to race conditios with other applications that cannot be
avoided, the tests may falsly fail or succeed in rare cases. Be sure to
double-check any changes you make.

## Similar Packages

 - [portfinder](https://www.npmjs.com/package/portfinder)
 - [get-port](https://www.npmjs.com/package/get-port)
 - [find-free-port](https://www.npmjs.com/package/find-free-port)
 - [freeport](https://www.npmjs.com/package/freeport)

## License

The MIT License
