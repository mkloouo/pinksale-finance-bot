import fs from 'fs';

import { getRandomElementFromArray } from './random.js';

export const getRandomProxy = () => {
  const lines = fs.readFileSync('./proxies.txt', 'utf-8');
  const allProxies = lines.split('\n');
  const randomProxy = getRandomElementFromArray(allProxies).trim();
  const [address, port, login, password] = randomProxy.split(':');

  return { address, port, login, password };
};

export const formProxyString = (proxy) =>
  `http://${proxy.login}:${proxy.password}@${proxy.address}:${proxy.port}`;
