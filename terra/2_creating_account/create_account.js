const { LCDClient, MnemonicKey } = require('@terra-money/terra.js');
require('dotenv').config();

const main = async () => {
  // Create connection to DataHub Terra node
  const terra = new LCDClient({
    URL: process.env.TERRA_NODE_URL,
    chainID: process.env.TERRA_CHAIN_ID,
  });

  // Create random address and mnemonic
  const mk = new MnemonicKey();

  console.log('mnemonic: ', mk.mnemonic);
  console.log('address: ', mk.accAddress);
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
