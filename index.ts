
import * as net from "net"

type Assignable<T> = { [P in keyof T]: T[P] } & { [key: string]: any };

function findFreePorts(count: number = 1) {

  return new Promise<number[]>((accept, reject) => {

    // contains tuples (server, isClosed, port)
    const servers: [net.Server, boolean, number | undefined][] = [];

    loop(0);

    function loop(i: number) {

      if (i < count) {

          const server = net.createServer();
          server.once('listening', () => { loop(i+1) });
          server.once('error', reject);
          server.listen();
          servers.push([server, false, undefined]);

      } else {

        function tryAccept() {
          for (const [closed, server] of servers) {
            if (!closed) {
              return;
            }
          }
          accept(servers.map(s => s[2]));
        }

        for (const tuple of servers) {
          const server = tuple[0];
          server.once('close', () => {
            tuple[1] = true;
            tryAccept();
          });
          tuple[2] = (server.address() as net.AddressInfo).port;
          server.close();          
        }

      }
    }

  });

}

export = findFreePorts;

