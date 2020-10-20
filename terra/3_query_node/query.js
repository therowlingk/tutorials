const { LCDClient, MnemonicKey } = require('@terra-money/terra.js');
require('dotenv').config({ path: '../.env' });

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

  const nodeInfo = await terra.tendermint.nodeInfo();
  console.log('nodeInfo: ', nodeInfo);

  const syncing = await terra.tendermint.syncing();
  console.log('syncing: ', syncing);

  const validatorSet = await terra.tendermint.validatorSet();
  console.log('validatorSet: ', validatorSet);

  // 2. Query account information
  const accountInfo = await terra.auth.accountInfo(mk.accAddress);
  console.log('accountInfo: ', accountInfo);

  // 3. Query oracle exchange rates
  const exchangeRates = await terra.oracle.exchangeRates();
  console.log('exchangeRates: ', JSON.stringify(exchangeRates));

  // 4. Query proposals
  const proposals = await terra.gov.proposals();
  console.log('proposals: ', JSON.stringify(proposals));
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
