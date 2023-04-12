
import findFreePorts from "find-free-ports"

(async function () {
  console.error(await findFreePorts(3));
})();

