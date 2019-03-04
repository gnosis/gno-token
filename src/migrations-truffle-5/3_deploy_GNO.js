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

module.exports = migrate
