# GNO Token
The GNO token and related smart contracts.

The token and contract can be in **Etherscan**:

* **Rinkeby**: [https://rinkeby.etherscan.io/token/0x45725d5dd61b3ff35945bb8ec95b343d2baa81fe]()
* **Mainnet**: [https://etherscan.io/token/0x6810e776880c02933d47db1b9fc05908e5386b96]()

## Setup and show the networks
```bash
# Install dependencies
yarn install

# Show current network addresses
yarn networks

# Compile and restore the network addresses
yarn restore
```

## Execute migrations into a local ganache-cli
```bash
# Run ganache CLU
yarn rpc

# Execute the migrations for the dependencies
yarn migrate-dependencies

# Execute the migrations
yarn migrate
```

## Generate a new version
```bash
# In a release branch (i.e. release/vX.Y.X)
# Migrate the version to the testnets, at least rinkeby, and posibly mainnet
# You can optionally change the gas price using the GAS_PRICE env variable
yarn compile
yarn networks-inject
MNEMONIC=$MNEMONIC_GNO yarn migrate --network rinkeby

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

## Verify contract
Flatten the smart contract:
```bash
npx truffle-flattener contracts/TokenGNO.sol > build/TokenGNO-EtherScan.sol
```

Go to Etherscan validation page:
* [https://rinkeby.etherscan.io/verifyContract?a=0x45725d5dd61b3ff35945bb8ec95b343d2baa81fe]()


Upload `build/TokenGNO-EtherScan.sol` and set:
* 