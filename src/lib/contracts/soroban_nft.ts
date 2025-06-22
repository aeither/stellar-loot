import * as Client from "hello_world"; // import the package we just added as a dependency

// instantiate and export the Client class from the bindings package
export default new Client.Client({
  ...Client.networks.testnet, // this includes the contract address and network passphrase
  rpcUrl: "https://soroban-testnet.stellar.org", // this is required to invoke the contract through RPC calls
  allowHttp: true,
  publicKey: undefined, // this is optional, but if you want to use the client to sign transactions, you need to set it
});

