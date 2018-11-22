const migrateDependencies = require('./2_migrate_dependencies')
const deployGno = require('./3_deploy_GNO')

module.exports = async params => {
  await migrateDependencies(params)
  await deployGno(params)
}
