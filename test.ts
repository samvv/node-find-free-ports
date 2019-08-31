
import findFreePorts from './index';
import isFree from "./isFree"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised);

const { expect, assert } = chai;

const PORT_COUNT = 28;

describe('a free port finder', () => {

  it('crashes properly when there are not enough free ports', async () => {
    expect(findFreePorts(10, { startPort: 65530 })).to.eventually.be.rejectedWith(Error);
  })

  it('can find some free ports', async () => {

    for (let i = 0; i < 10; i++) {

      const ports = await findFreePorts(PORT_COUNT);

      expect(ports).to.have.lengthOf(PORT_COUNT);
        
      const set = new Set();
      for (const port of ports) {
        if (set.has(port)) {
          assert.fail('Duplicate port found in result set.')
        } else {
          set.add(port);
        }
      }

      for (const port of ports) {
        expect(isFree(port)).to.eventually.be.true;
      }

    }

  });

});



