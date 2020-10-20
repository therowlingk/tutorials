const { LCDClient } = require('@terra-money/terra.js');
require('dotenv').config({ path: '../.env' });

const main = async () => {
  // Create connection to DataHub Terra node
  const terra = new LCDClient({
    URL: process.env.TERRA_NODE_URL,
    chainID: process.env.TERRA_CHAIN_ID,
  });

  console.log('Successfully connected to Terra node');
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
