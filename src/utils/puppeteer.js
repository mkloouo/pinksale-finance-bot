import puppeteer from 'puppeteer';
import proxyChain from 'proxy-chain';

import { getRandomElementFromArray, getRandomUserAgent } from './random.js';
import { makeProxyString, getRandomProxy } from './proxy.js';
import { config } from '../constants/config.js';

export const createBrowser = async () => {
  const proxyObject = getRandomProxy();
  const oldProxy = makeProxyString(proxyObject);
  const proxy = await proxyChain.anonymizeProxy(oldProxy);
  const userAgent = getRandomUserAgent();

  return {
    browser: await puppeteer.launch({
      // headless: true,
      waitForInitialPage: true,
      args: [
        '--no-sandbox',
        '--disable-setupid-sandbox',
        `--proxy-server=${proxy}`,
        `--user-agent=${userAgent}`,
      ],
    }),
    proxyObject,
  };
};

export const stopBrowser = async (browser) => {
  return await browser.close();
};

export const simulateScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, _reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

export const simulateInput = async (page) => {
  const links = ['0xBaF120916Cb93a9007b8aA2eA7849Cbc5D1b718b'];
  const randomLink = getRandomElementFromArray(links);
  const anchorElement = await page.$x(`//a[contains(., '${randomLink}')]`);
  await anchorElement[0].click();
};

export const performSiteActions = async (url, log) => {
  const { browser, proxyObject } = await createBrowser();
  log = log ? log : console.log([config.urls.pinkSale, proxyObject.address]);

  try {
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    });
    await page.setJavaScriptEnabled(true);
    await page.setDefaultTimeout(0);

    await page.goto(url);
    await page.setViewport({
      width: 1200,
      height: 800,
    });

    await simulateInput(page);
    await simulateScroll(page);
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }

  if (log && typeof log === 'function') {
    log([config.urls.pinkSale, proxyObject.address]);
  }
};
