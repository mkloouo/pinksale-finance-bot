import { config } from '../config.js';

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomElementFromArray = (array) =>
  array[randomIntFromInterval(0, array.length - 1)];

export const getRandomUserAgent = () => {
  const allUserAgents = Object.keys(config.userAgents).reduce(
    (acc, key) => acc.concat(config.userAgents[key]),
    [],
  );

  return getRandomElementFromArray(allUserAgents);
};
