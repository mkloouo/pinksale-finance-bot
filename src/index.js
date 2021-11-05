import { makeVisit } from './actions/makeVisit.js';
import { config } from './constants/config.js';
import { getRandomUserAgent } from './utils/getRandomUserAgent.js';

(async function () {
  const randomUserAgent = getRandomUserAgent();
  await makeVisit(randomUserAgent);

  console.log(`made visit to ${config.urls.pinkSale}`);
})().catch((e) => console.log(e));
