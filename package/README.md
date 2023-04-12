
This is a very small package that allows developers to find free ports
on the local system. Unlike most other "find-free-port" utilities, this library
allows scanning for multiple free ports at once, making sure that there are no
doubles in the result.

✔️ TypeScript support 

✔️ No dependencies

✔️ Should work on all major NodeJS versions

✔️ Now automatically tested for mistakes

This library has been benchmarked and parallelises the port checks using a
customisable number of workers for optimal performance. The alogithm does
**not** create a new anonymous socket for each port, but instead iterates in
parallell over the system's port numbers. This is both faster and less
resource-intensive.

🔍 Found an issue? Please let me know in the [issue tracker][1] and we'll get
it fixed ASAP.

[1]: https://github.com/samvv/node-find-free-ports/issues

```
npm i find-free-ports
```

## Usage

Import the library:

```js
import findFreePorts from "find-free-ports"
```
or
```js
const findFreePorts = require('find-free-ports');
```

Next, call the main function with the amount of free ports you need:

```js
async function startMultipleServers() {
  const [a, b, c, d] = await findFreePorts(4);
  // now do something interesting with the new ports ...
}
```

## API

### findFreePorts(count?, opts?)

```js
import { findFreePorts } from "find-free-ports"
```

Search for the specified amount of free ports on the local machine. If `count`
is left unspecified, it defaults to `1`. `opts` may be a dictionary containing one
of the following keys:

 - `isFree`: custom function that is used to check whether the given port is free
 - `startPort`: start scanning for free ports starting from this port number.
     Defaults to `1025`.
 - `endPort`: prevent the scanner from exceeding this port number. Defaults to
    `65535`.
 - `jobCount`: how much workers that may at most be looking for free ports

### isFreePort(port)

```js
import { isFreePort } from "find-free-ports"
```

Check whether the given port is free by trying to set up a socket.

This function returns a promise containing either `true` or `false` depending
on whether the port was available.

### FindFreePortsOptions

```js
import { FindFreePortsOptions } from "find-free-ports"
```

A TypeScript interface that lists all valid options that may be passed as the
`opts` parameter to `findFreePorts()`.

## Similar Packages

 - [portfinder](https://www.npmjs.com/package/portfinder)
 - [get-port](https://www.npmjs.com/package/get-port)
 - [find-free-port](https://www.npmjs.com/package/find-free-port)
 - [freeport](https://www.npmjs.com/package/freeport)

## License

The MIT License
