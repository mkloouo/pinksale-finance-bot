import { config } from '../constants/config.js';
import { randomIntFromInterval } from './randomIntFromInterval.js';

export const getRandomUserAgent = () => {
  const allUserAgents = Object.keys(config.userAgents).reduce((acc, key) =>
    acc.concat(config.userAgents[key]),
  );

  return allUserAgents[randomIntFromInterval(0, allUserAgents.length - 1)];
};
