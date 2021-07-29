
import test from "ava"
import net from "net"

import isFree from "./isFree"

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

