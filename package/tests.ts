
import test from "ava"

import net from "net"

import { findFreePorts, isFree } from './index';

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

function listen(server: net.Server, port?: number): Promise<number> {
  return new Promise((accept, reject) => {
    server.once('error', reject);
    server.listen(port, () => {
      accept((server.address() as net.AddressInfo).port);
    });
  });
}

function closeServer(server: net.Server) {
  return new Promise<void>((accept, reject) => {
    server.close(err => {
      if (err) {
        reject(err);
      } else {
        accept();
      }
    });
  });
}


test('findFreePorts() crashes properly when there are not enough free ports within the given range', async (t) => {
  await t.throwsAsync(() => findFreePorts(10, { startPort: 65530 }));
  await t.throwsAsync(() => findFreePorts(3, { startPort: 1024, endPort: 1026 }));
})

test('searches for one port by default', async (t) => {
  const ports = await findFreePorts();
  t.assert(ports.length === 1);
  t.truthy(await isFree(ports[0]));
});

test('can find a few ports when requested', async (t) => {
  const ports = await findFreePorts(3);
  t.assert(ports.length === 3);
  t.assert(isUnique(ports));
});

test('can find a large amount of unique free ports', async (t) => {
  const ports = await findFreePorts(PORT_COUNT);
  t.assert(ports.length === PORT_COUNT);
  t.truthy(isUnique(ports));
});

test('can run with only one job specified', async (t) => {
  const ports = await findFreePorts(PORT_COUNT, { jobCount: 1 });
  t.assert(ports.length === PORT_COUNT);
  t.truthy(isUnique(ports));
});

test('can run with exactly two jobs', async (t) => {
  const ports = await findFreePorts(PORT_COUNT, { jobCount: 2 });
  t.assert(ports.length === PORT_COUNT);
  t.truthy(isUnique(ports));
});

test('isFree() detects when a port is in use', async (t) => {
  t.plan(1);
  const server = net.createServer();
  const port = await listen(server, undefined);
  t.falsy(await isFree(port));
  await closeServer(server);
});

test('isFree() detects when a port is free', async (t) => {
  t.plan(1);
  const server = net.createServer();
  const port = await listen(server);
  await closeServer(server);
  t.truthy(await isFree(port));
});

