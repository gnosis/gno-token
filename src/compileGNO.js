// GNO was deployed usign v0.4.10
// https://github.com/ethereum/solc-js/tree/v0.4.10
const solc = require('solc')
const path = require('path')

const input = {
	'lib.sol': 'library L { function f() returns (uint) { return 7; } }',
	'cont.sol': 'import "lib.sol"; contract x { function g() { L.f(); } }'
}
const COMPILER_VERSION = 'v0.4.10+commit.f0d539ae'

async function loadCompiler (version) {
  return new Promise((resolve, reject) => {
    solc.loadRemoteVersion(version, (err, solcLegacy) => {
      if (err) {
        reject(err)
      } else {
        resolve(solcLegacy)
      }
    })
  })
}

async function compile () {
  const solc = await loadCompiler(COMPILER_VERSION)
  var output = solc.compile({ sources: input }, 1)

  for (var contractName in output.contracts) {
    console.log(contractName + ': ' + output.contracts[contractName].bytecode)
  }
}

// Compile contracts
compile()
  .then(() => {
    console.log('The GNO contract has been compiled')
  })
  .catch(error => {
    console.error('Error compiling the GNO contract: ' + error.name)
    console.error(error)
    process.exit(1)
  })
