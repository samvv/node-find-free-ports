
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

## Similar Packages
 
 - [portfinder](https://www.npmjs.com/package/portfinder)
 - [get-port](https://www.npmjs.com/package/get-port)
 - [find-free-port](https://www.npmjs.com/package/find-free-port)
 - [freeport](https://www.npmjs.com/package/freeport)

## License

The MIT License
