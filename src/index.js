import fs from 'fs';
import { exit } from 'process';

import { performSiteActions } from './utils/puppeteer.js';
import { config } from './constants/config.js';

async function main() {
  process.setMaxListeners(config.parallelJobs + 10);
  while (true) {
    await performSiteActions(config.urls.pinkSale, (...args) => {
      console.log('finished with:', args);
    });
  }
}

main()
  .then((result) => console.log('then result:', result))
  .catch((e) => console.log(e));
