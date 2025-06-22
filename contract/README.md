# Soroban Project

## Project Structure

This repository uses the recommended structure for a Soroban project:
```text
.
├── contracts
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `contracts`, each in their own directory. There is already a `hello_world` contract in there to get you started.
- If you initialized this project with any other example contracts via `--with-example`, those contracts will be in the `contracts` directory as well.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
- Frontend libraries can be added to the top-level directory as well. If you initialized this project with a frontend template via `--frontend-template` you will have those files already included.

# Faucet

fund account
https://friendbot.stellar.org/?addr=

# Guide

stellar keys generate alice --network testnet

stellar contract init hello-world

stellar contract build

stellar contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
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
    "hello_world": "file:./contract/bindings",
** update the package name inside binding to match frontend import
