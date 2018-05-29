cd node_modules/@gnosis.pm/util-contracts && \
  npm run compile && \
  npm run networks-inject && \
  cp -r ./build/contracts/ ./build/contracts2/  && \
  rm ./build/contracts2/Migrations.json  && \
  mkdir -p ../../../build/contracts  && \
  cp -r ./build/contracts2/* ../../../build/contracts