
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

# Interact

stellar contract invoke \
  --network testnet \
  --id CCG7MCOQKQACBW5VLQ7UQXTLG6P7JFOYGGE3IKQZNDAWGPVMAF4GADBD \
  --source-account alice \
  -- mint \
  --to GCCOBOTHO6DFOTQ6PELRDG3GG4TDDNQL7KMJSHZOMGIVPTWJJGZY4ERO

# A command

stellar contract bindings typescript   --network testnet   --contract-id CD4N56QEYZ5IGGC72TILFR25CNNVYMBDA2OKO5DJ6JI64GWBJAYCSPQ3   --output-dir packages/soroban_nft

npm install && npm run build

npm add file:./packages/soroban_nft