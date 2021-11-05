import { makeVisit } from './actions/makeVisit';
import { config } from './constants/config';
import { getRandomUserAgent } from './utils/getRandomUserAgent';

(async function () {
  const randomUserAgent = getRandomUserAgent();
  await makeVisit(randomUserAgent);

  console.log(`made visit to ${config.urls.pinkSale}`);
})().catch((e) => console.log(e));
