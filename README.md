# GNO Token
The GNO token and related smart contracts.

The token and contract can be in **Etherscan**:
* **Token**: [https://etherscan.io/token/0x6810e776880c02933d47db1b9fc05908e5386b96]()
* **Contract**: [https://etherscan.io/address/0x6810e776880c02933d47db1b9fc05908e5386b96]()

## Setup and show the networks
```bash
# Install dependencies
yarn install

# Show current network addresses
yarn networks

# Compile and restore the network addresses
yarn restore
```

## Generate a new version
```bash
# In a release branch (i.e. release/vX.Y.X)
# Migrate the version to the testnets, at least rinkeby, and posibly mainnet
# You can optionally change the gas price using the GAS_PRICE env variable
MNEMONIC="your mnemonic here..." yarn migrate --network rinkeby

# Extract the network file
yarn networks-extract

# Commit the network file
git add network.json
git commit -m 'Update the networks file'

# Generate version using Semantic Version: https://semver.org/
# For example, for a minor version
npm version minor
git push
git push --tags

# Deploy npm package
npm publish --access=public

# Merge tag into develop, to deploy it to production, also merge it into master
git checkout develop
git merge vX.Y.X
```
