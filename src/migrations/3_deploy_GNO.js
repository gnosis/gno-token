async function migrate (artifacts, deployer, network, accounts) {
  const TokenGNO = artifacts.require('TokenGNO')
  const Math = artifacts.require('Math')

  const INITIAL_TOKEN_AMOUNT = 10e6 // 10M

  return deployer
    .then(() => Math.deployed())
    .then(() => deployer.link(Math, TokenGNO))
    .then(() => {
      return deployer.deploy(TokenGNO, INITIAL_TOKEN_AMOUNT * 1e18)
    })
}

module.exports = migrate
