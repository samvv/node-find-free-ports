
import * as net from "net"

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

export = isFree;

