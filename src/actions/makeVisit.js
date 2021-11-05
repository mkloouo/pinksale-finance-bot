import fetch from 'node-fetch';

import { config } from '../constants/config.js';

export const makeVisit = async (userAgent) =>
  await fetch(config.urls.pinkSale, {
    headers: {
      'User-Agent': userAgent,
    },
  });
