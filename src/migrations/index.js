const migrateDependencies = require('./2_DEV_migrate_dependencies')
const deployGno = require('./3_deploy_GNO')

module.exports = params => {
  return params.deployer
    .then(() => migrateDependencies(params))
    .then(() => deployGno(params))
}
