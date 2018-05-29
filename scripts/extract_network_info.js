const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// TODO: We should improve this script and leave then just in util-contracts
// project, so we don't have to add it for every project

const dir = path.join('build', 'contracts')

try {
  const dirFiles = fs.readdirSync(dir)

  Promise.all(
    dirFiles.filter(fname => fname.endsWith('.json')).map(
      fname =>
        new Promise((resolve, reject) => {
          fs.readFile(path.join(dir, fname), (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve([fname.slice(0, -5), JSON.parse(data)['networks']])
            }
          })
        })
    )
  ).then(nameNetworkPairs => {
    fs.writeFileSync(
      'networks.json',
      JSON.stringify(
        _.fromPairs(
          nameNetworkPairs.filter(([_name, nets]) => !_.isEmpty(nets))
        ),
        null,
        2
      )
    )
  })
} catch (err) {
  if (err.code === 'ENOENT') {
    fs.writeFileSync('networks.json', '{}')
  } else {
    throw err
  }
}
