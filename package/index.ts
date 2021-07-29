
import os from "os"
import net from "net"

const MIN_PORT = 1025;
const MAX_PORT = 65535;
const DEFAULT_JOB_COUNT = os.cpus().length;

export interface FindFreePortsOptions {
  startPort?: number;
  endPort?: number;
  jobCount?: number;
  isFree?: (port: number) => Promise<boolean>;
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export async function findFreePorts(count = 1, {
  endPort = MAX_PORT,
  startPort = MIN_PORT,
  jobCount = DEFAULT_JOB_COUNT,
  isFree = isFreePort
}: FindFreePortsOptions = {}): Promise<number[]> {

  if (count > (endPort - startPort)) {
    throw new Error(`Could not find free ports: the range of allowed ports is not large enough for the requested amount of ports to find.`);
  }

  const portInterval = Math.ceil((endPort - startPort) / jobCount);

  const ports: number[] = [];
  const jobPromises: Array<Promise<void>> = [];

  for (let i = 0; i < jobCount; i++) {
    jobPromises.push(scanRange(startPort + portInterval * i, Math.min(endPort, startPort + portInterval * (i+1))));
  }

  await Promise.all(jobPromises);

  if (ports.length < count) {
    throw new Error(`Could not find free ports: there were not enough ports available.`);
  }

  return ports;

  async function scanRange(startPort: number, endPort: number) {
    for (let port = startPort; port < endPort; port++) {
      if (ports.length >= count) {
        break;
      }
      if (await isFree(port)) {

        if (ports.length >= count) {
          break;
        }
        ports.push(port);
      }
    }
  }

}

export function isFreePort(port: number): Promise<boolean> {
  return new Promise((accept, reject) => {
    const sock = net.createConnection(port);
    sock.once('connect', () => { sock.end(); accept(false); });
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

export default findFreePorts;

