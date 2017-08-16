
import { expect } from "chai"

import findFreePorts = require('./');
import isFree = require('./isFree');

describe('a free port finder', () => {
  
  it('can find some free ports', async () => {
    const ports = await findFreePorts(2);
    for (const port of ports)
      expect(await isFree(port)).to.be.true
  });

});

