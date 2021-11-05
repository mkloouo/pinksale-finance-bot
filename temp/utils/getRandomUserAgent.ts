import { config } from '../constants/config';
import { randomIntFromInterval } from './randomIntFromInterval';

export const getRandomUserAgent = () => {
  const allUserAgents = Object.keys(config.userAgents).reduce((acc, key) =>
    acc.concat(config.userAgents[key]),
  );

  return allUserAgents[randomIntFromInterval(0, allUserAgents.length - 1)];
};
