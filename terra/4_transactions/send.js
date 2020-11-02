const { LCDClient, MnemonicKey, MsgSend, isTxError } = require('@terra-money/terra.js');
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

  const toAddress = 'terra1uwqg9vvg82sw29xuun777547jg8tnfrdh673fl';

  // Create a message
  const msg = new MsgSend(
    wallet.key.accAddress,
    toAddress,
    { uluna: 10 }
  );

  // Create and sign transaction
  const tx = await wallet.createAndSignTx({
    msgs: [msg],
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
