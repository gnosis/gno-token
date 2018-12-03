/* global artifacts, web3 */
/* eslint no-undef: "error" */

const deployGno = require('../src/migrations-truffle-5/3_deploy_GNO')

module.exports = function (deployer, network, accounts) {
  return deployGno({
    artifacts,
    deployer,
    network,
    accounts,
    web3
  })
}
