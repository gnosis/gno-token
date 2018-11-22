const INITIAL_TOKEN_AMOUNT = 10e6 // 10M

async function migrate ({
  artifacts,
  deployer,
  network,
  accounts,
  initialTokenAmount = INITIAL_TOKEN_AMOUNT,
  web3
}) {
  const BN = web3.utils.BN
  const TokenGNO = artifacts.require('TokenGNO')
  const { Math } = _getDependencies(artifacts, network, deployer)

  console.log('Link Math lib to TokenGNO')
  await Math.deployed()
  deployer.link(Math, TokenGNO)

  const owner = accounts[0]
  console.log('Deploy TokenGNO:')
  console.log('  - Owner: %s', owner)
  console.log('  - Initial token amount: %s', initialTokenAmount)
  const initialTokenAmountWei = web3.utils.toWei(
    new BN(initialTokenAmount),
    'ether'
  )
  return deployer.deploy(TokenGNO, initialTokenAmountWei)
}

function _getDependencies (artifacts, network, deployer) {
  let Math
  if (network === 'development') {
    Math = artifacts.require('Math')
  } else {
    const contract = require('truffle-contract')
    Math = contract(require('@gnosis.pm/util-contracts/build/contracts/Math'))
    Math.setProvider(deployer.provider)
  }

  return {
    Math
  }
}

module.exports = migrate
