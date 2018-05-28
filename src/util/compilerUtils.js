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

async function loadCompilerLocal (version) {
  const solJsonFileName = 'soljson-' + version + '.js'
  const solJsonPath = path.join(__dirname, '..', 'vendor', 'solc-compiler', solJsonFileName)
  return solc.setupMethods(require(solJsonPath))
}

module.exports = {
  loadCompiler,
  loadCompilerLocal
}
