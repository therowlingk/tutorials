// Load Near SDK components
const near = require("near-api-js");

// Setup default client options
const options = {
  networkId:   "default",
  nodeUrl:     "https://rpc.testnet.near.org",
  walletUrl:   "https://wallet.testnet.near.org",
  helperUrl:   "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  keyStore:    {} // we will configure this later
}

async function main() {
  // Configure the client with options and our local key store
  const client = await near.connect(options);
  const provider = client.connection.provider;
  console.log("Client config:", client.config);

  // Get current node status
  const status = await provider.status();
  console.log("Status:", status);
}

main();
