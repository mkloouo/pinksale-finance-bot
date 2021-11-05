if (-not(get-command "npm" -errorAction SilentlyContinue)) {
    echo "> install latest node.js: https://nodejs.org/en/"
    exit 1
}

if (-not(test-path node_modules)) {
    try {
        echo "> installing node modules"
        npm install
    }
    catch {
        throw $_.Exception.Message
    }
}

if (-not(test-path pinksale-finance-bot.exe)) {
    try {
        echo "> building bot"
        npm run build
    }
    catch {
        throw $_.Exception.Message
    }
}

echo "> running bot"
./pinksale-finance-bot.exe


