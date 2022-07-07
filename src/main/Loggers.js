const fs = require('fs');
let rawConfigData = fs.readFileSync("./config.json");
const CONFIG = JSON.parse(rawConfigData);
const pino = require('pino');

const LOG_DIR = `${process.cwd()}/logs`;
const PINO_OPTS = {
    level: CONFIG.LOG.LEVEL,
    timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
    prettyPrint: CONFIG.LOG.PRETTY_PRINT,
    formatters: {
        level: (label, number) => {
            return { level: number }
        }
    },
    base: null
};

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)){
    fs.mkdirSync(LOG_DIR);
}


const Loggers = {
    LINE: '-'.repeat(50),
    performance: pino(PINO_OPTS, pino.destination(`${LOG_DIR}/performance.log`)),
    execution: pino(PINO_OPTS, pino.destination(`${LOG_DIR}/execution.log`)),
    binance: pino(PINO_OPTS, pino.destination(`${LOG_DIR}/binance.log`)),
};

module.exports = Loggers;
