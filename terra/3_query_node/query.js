const { LCDClient, MnemonicKey } = require('@terra-money/terra.js');
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

  // 1. Query state of chain
  const blockInfo = await terra.tendermint.blockInfo();
  console.log('blockInfo: ', blockInfo);
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
