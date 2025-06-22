
# Guide

stellar keys generate alice --network testnet

stellar keys address alice

stellar contract init hello-world

stellar contract build

stellar contract deploy \
  --wasm target/wasm32v1-none/release/soroban_nft.wasm \
  --source alice \
  --network testnet \
  --alias hello_world

stellar contract bindings typescript \
  --contract-id hello_world \
  --network testnet \
  --output-dir bindings

in "bindings" to build the JavaScript NPM package.
  npm install && npm run build

add to frontend package.json
    "hello_world": "file:./contracts/nft/bindings",
** update the package name inside binding to match frontend import
