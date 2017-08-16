
import { createServer } from "net"

function isFree(port: number) {
  return new Promise<boolean>((accept, reject) => {
    const server = createServer();
    server.once('error', (e: NodeJS.ErrnoException) => {
      if (e.code === 'EADDRINUSE' || e.code === 'EACCES') {
        accept(false);
      } else {
        reject(e);
      }
    });
    server.once('listening', function () {
      server.once('close', () => { accept(true); });
      server.close();
    });
    server.listen(port);
  });
}

export = isFree;

