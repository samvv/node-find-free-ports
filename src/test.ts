
import * as os from "os"
import * as net from "net"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

import findFreePorts from './findFreePorts';
import isFree from "./isFree"

chai.use(chaiAsPromised);

const { expect, assert } = chai;

const PORT_COUNT = 1000;

function isUnique<T>(array: T[]): boolean {
  const set = new Set();
  for (const element of array) {
    if (set.has(element)) {
      return false;
    }
    set.add(element);
  }
  return true;
}

describe('isFree()', () => {

  it('detects when a port is in use', (done) => {
    const server = net.createServer();
    server.listen(undefined, async () => {
      assert.isFalse(await isFree((server.address() as net.AddressInfo).port));
      server.close();
      done();
    });
  });

  it('also detects when a port is free', (done) => {
    const server = net.createServer();
    server.listen(undefined, async () => {
      const port = (server.address() as net.AddressInfo).port;
      server.close(async () => {
        assert.isTrue(await isFree(port));
        done();
      });
    });
  });

});

describe('findFreePorts()', () => {

  it('crashes properly when there are not enough free ports within the given range', async () => {
    expect(findFreePorts(10, { startPort: 65530 })).to.eventually.be.rejectedWith(Error);
    expect(findFreePorts(3, { startPort: 1024, endPort: 1026 })).to.eventually.be.rejectedWith(Error);
  })

  it('searches for one port by default', async () => {
    const ports = await findFreePorts();
    assert.lengthOf(ports, 1);
    assert(await isFree(ports[0]));
  });

  it('can find a few ports when requested', async () => {
    const ports = await findFreePorts(3);
    assert(isUnique(ports));
  });

  it('can find a large amount of unique free ports', async () => {
    const ports = await findFreePorts(PORT_COUNT);
    assert.lengthOf(ports, PORT_COUNT);
    assert(isUnique(ports));
  });

  it('can run with only one job specified', async () => {
    const ports = await findFreePorts(PORT_COUNT, { jobCount: 1 });
    assert.lengthOf(ports, PORT_COUNT);
    assert(isUnique(ports));
  });

  it('can run with exactly two jobs', async () => {
    const ports = await findFreePorts(PORT_COUNT, { jobCount: 2 });
    assert.lengthOf(ports, PORT_COUNT);
    assert(isUnique(ports));
  });

});



