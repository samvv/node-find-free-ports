
import { expect } from "chai"

import findFreePorts = require('./');
import * as net from "net"
// import isFree = require('./isFree');

describe('a free port finder', () => {
  
  it('can find some free ports', done => {

    findFreePorts(10000).then(ports => {

      const listening = new Set<net.Server>();

      for (const port of ports) {
        const server = net.createServer();
        server.once('listening', () => { listening.add(server); tryClose(); })
        server.listen(port);
      }

      function tryClose() {
        if (listening.size === ports.length) {
          for (const server of listening) {
            server.once('close', () => {
              listening.delete(server)
              tryFinish();
            })
            server.close();
          }
        }
      }

      function tryFinish() {
        if (listening.size === 0) {
          done();
        }
      }

    });

  });

});

