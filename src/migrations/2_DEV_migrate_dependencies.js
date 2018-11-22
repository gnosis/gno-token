const migrateUtils = require('@gnosis.pm/util-contracts/src/migrations')

function migrate ({
  artifacts,
  deployer,
  network,
  accounts
}) {
  const deployParams = { artifacts, deployer, network, accounts }

  if (network === 'development') {
    return migrateUtils(deployParams)
  } else {
    console.log('Not in development, so nothing to do. Current network is %s', network)
  }
}

module.exports = migrate
