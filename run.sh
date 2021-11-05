#!/usr/bin/env bash

echo "> installing needed deps"
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

if ! command -v nvm &> /dev/null; then
  echo "> install latest node.js: https://nodejs.org/en/"
  
  echo "> installing curl"
  sudo apt install curl

  echo "> installing nvm"
  curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

  echo "> adding nvm env to shell"
  echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.profile
  echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.profile
  echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.profile

  echo "> updating profile env"
  source ~/.profile
fi

if ! command -v npm &> /dev/null; then
  echo "installing latest npm"
  nvm install lts/erbium
  nvm alias default lts/erbium
  npm use default
fi

if [ ! -d node_modules ]; then
  echo "> installing node modules"
  npm install
fi

echo "> running bot"
npm start
