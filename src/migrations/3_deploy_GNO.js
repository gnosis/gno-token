const INITIAL_TOKEN_AMOUNT = 10e6 // 10M

async function migrate ({
  artifacts,
  deployer,
  network,
  accounts,
  initialTokenAmount = INITIAL_TOKEN_AMOUNT
}) {
  const TokenGNO = artifacts.require('TokenGNO')
  const { Math } = getDependencies()

  return deployer
    .then(() => Math.deployed())
    .then(() => deployer.link(Math, TokenGNO))
    .then(() => {
      return deployer.deploy(TokenGNO, initialTokenAmount * 1e18)
    })
}

function getDependencies ({ artifacts, network, deployer }) {
  let Math
  if (network === 'development') {
    Math = artifacts.require('Math')
  } else {
    const contract = require('truffle-contract')
    const Math = contract(require('@gnosis.pm/util-contracts/build/contracts/Math'))
    Math.setProvider(deployer.provider)
  }

  return {
    Math
  }
}

module.exports = migrate
