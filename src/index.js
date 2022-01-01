import { performSiteActions } from './utils/puppeteer.js';
import { config } from './config.js';

async function main() {
  process.setMaxListeners(config.parallelJobs + 5);
  while (true) {
    await performSiteActions(config.urls.pinkSale, (...args) => {
      console.log('[finish]:', args);
    });
  }
}

main()
  .then((result) => console.log('[close]:', result))
  .catch((e) => console.log(e));
