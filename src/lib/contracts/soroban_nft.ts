import * as Client from "soroban_nft"; // import the package we just added as a dependency

// instantiate and export the Client class from the bindings package
export default new Client.Client({
  ...Client.networks.testnet, // this includes the contract address and network passphrase
  rpcUrl: "https://soroban-testnet.stellar.org", // this is required to invoke the contract through RPC calls
});