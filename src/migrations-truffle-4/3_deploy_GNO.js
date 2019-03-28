const INITIAL_TOKEN_AMOUNT = 10e6 // 10M

function migrate ({
  artifacts,
  deployer,
  network,
  accounts,
  initialTokenAmount = INITIAL_TOKEN_AMOUNT
}) {
  const TokenGNO = artifacts.require('TokenGNO')

  return deployer
    .then(() => {
      const owner = accounts[0]
      console.log('Deploying GNO with owner: %s', owner)
      return deployer.deploy(TokenGNO, initialTokenAmount * 1e18)
    })
}

module.exports = migrate
