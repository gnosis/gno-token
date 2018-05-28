const compilerUtils = require('./util/compilerUtils')
const path = require('path')

const LEGACY_CONTRACTS_DIR = path.join(__dirname, '..', 'contracts-legacy')

async function loadSources () {
  const fs = require('fs')
  const sources = {}

  fs.readdirSync(LEGACY_CONTRACTS_DIR).forEach(file => {
    sources[file] = fs.readFileSync(path.join(LEGACY_CONTRACTS_DIR, file), {
      encoding: 'utf8'
    })
  })

  return sources
}

// GNO was deployed usign v0.4.10
//  https://github.com/ethereum/solc-js/tree/v0.4.10
//  https://etherscan.io/address/0x6810e776880c02933d47db1b9fc05908e5386b96#code
const COMPILER_VERSION = 'v0.4.10+commit.f0d539ae'

async function compile () {
  const sources = await loadSources()
  // const solc = await compilerUtils.loadCompiler(COMPILER_VERSION)
  const solc = await compilerUtils.loadCompilerLocal(COMPILER_VERSION)
  var output = solc.compile({ sources }, 1)
  console.log(output)

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
