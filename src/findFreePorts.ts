
import isFree from "./isFree"

const MIN_PORT = 1025;
const MAX_PORT = 65535;
const DEFAULT_JOB_COUNT = 10;

export interface FindFreePortsOptions {
  startPort?: number;
  endPort?: number;
  jobCount?: number;
}

export async function findFreePorts(count = 1, opts: FindFreePortsOptions = {}): Promise<number[]> {

  const startPort = opts.startPort ?? MIN_PORT;
  const endPort = opts.endPort ?? MAX_PORT;
  const jobCount = Math.min(count, opts.jobCount ?? DEFAULT_JOB_COUNT);

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

export default findFreePorts;

