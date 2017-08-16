
import { Server, createServer } from "net"

type Assignable<T> = { [P in keyof T]: T[P] } & { [key: string]: any };

async function findFreePorts(count: number = 1) {


  const servers = await Promise.all((function () {

    const servers = [];

    for (let i = 0; i < count; ++i) {
      servers.push(new Promise<Server>((accept, reject) => {
        const server = createServer();
        server.once('listening', () => accept(server));
        server.once('error', reject);
        server.listen();
      }));
    }
    
    return servers;

  })());

  return new Promise<number[]>((accept, reject) => {

    function tryAccept() {
      for (const server of servers)
        if (!server.closed)
          return;
      accept(servers.map(s => s.port));     
    }

    for (const server of servers) {
      server.once('close', () => {
        server.closed = true;
        tryAccept();
      });
      server.port = server.address().port;
      server.close();          
    }

  });

}

export = findFreePorts;

