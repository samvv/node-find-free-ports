
import * as net from "net"

const MIN_PORT = 1025;
const MAX_PORT = 65535;

interface FindFreePortsOptions {
  startPort?: number;
  endPort?: number;
  maxParallell?: number;
}

const DEFAULT_PARALLEL = 10;

async function findFreePorts(count: number = 1, opts: FindFreePortsOptions = {}): Promise<number[]> {

  const startPort = opts.startPort !== undefined ? opts.startPort : MIN_PORT;
  const endPort = opts.endPort !== undefined ? opts.endPort : MAX_PORT;

  const parallel = Math.min(count, opts.maxParallell !== undefined ? opts.maxParallell : DEFAULT_PARALLEL);

  const ports: number[] = [];
  let port = startPort;

  return new Promise((accept, reject) => {
    
    for (let i = 0; i < parallel; i++) {
      const next = () => {
        if (ports.length === count) {
          accept(ports);
        } else if (count - ports.length > parallel || ports.length % parallel < i) {
          test(port++).then(next).catch(reject);
        }
      }
      test(port++).then(next).catch(reject)
    }

  });

  async function test(port: number) {
    if (port > endPort) {
      throw new Error(`Could not find free ports: not enough free ports available.`);
    }
    if (await isFree(port)) {
      ports.push(port);
    }
  }

  function isFree(port: number): Promise<boolean> {
    return new Promise((accept, reject) => {
      const sock = net.createConnection(port);
      sock.once('connect', () => { sock.end() });
      sock.once('close', () => { accept(false); })
      sock.once('error', (e: NodeJS.ErrnoException) => {
        sock.destroy();
        if (e.code === 'ECONNREFUSED') {
          accept(true)
        } else {
          reject(e);
        }
      });
    });
  }

}

export = findFreePorts;

