const { LCDClient, MnemonicKey, MsgSwap, isTxError, Coin } = require('@terra-money/terra.js');
require('dotenv').config();

const main = async () => {
  // Create connection to DataHub Terra node
  const terra = new LCDClient({
    URL: process.env.TERRA_NODE_URL,
    chainID: process.env.TERRA_CHAIN_ID,
  });

  // Use key created in tutorial #2
  const mk = new MnemonicKey({
    mnemonic: process.env.MNEMONIC,
  });

  // Create a wallet out of you mnemonic key
  const wallet = terra.wallet(mk);

  // Create a message
  const swap = new MsgSwap(
    wallet.key.accAddress,
    new Coin('uluna', '1000'),
    'uusd'
  );

  // Create and sign transaction
  const tx = await wallet.createAndSignTx({
    msgs: [swap],
    memo: "Hello from Figment Learn"
  });

  // Broadcast transaction
  const txResult = await terra.tx.broadcast(tx);

  // Get transaction hash
  const txHash = await terra.tx.hash(tx);
  console.log('txHash: ', txHash);

  if (isTxError(txResult)) {
    throw new Error(`encountered an error while running the transaction: ${txResult.code} ${txResult.codespace}`);
  }

  // Check for events from the first message
  console.log('logs: ', txResult.logs);
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
