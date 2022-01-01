import process from 'process';
import { performSiteActions } from './utils/puppeteer.js';
import { config } from './config.js';

async function main() {
  process.setMaxListeners(config.parallelJobs + 5);
  const url = process.argv[2] || config.urls.pinkSale;

  while (true) {
    await performSiteActions(url, (...args) => {
      console.log('[finish] performed site actions:', args);
    });
  }
}

main()
  .then((result) => {
    console.log('[close] closed main function:', result);
    process.exit(0);
  })
  .catch((e) => console.log(e));
