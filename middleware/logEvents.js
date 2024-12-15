const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { promises: fsPromises, existsSync } = require('fs');
const path = require('path');

// Cache the logs directory path
const logsDir = path.join(__dirname, '..', 'logs');

const logEvents = async (message, logName) => {
    const logItem = [
        format(new Date(), 'yyyyMMdd\tHH:mm:ss'),
        uuid(),
        message
    ].join('\t') + '\n';

    try {
        if (!existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }
        await fsPromises.appendFile(path.join(logsDir, logName), logItem);
    } catch (err) {
        console.error('Error writing to log:', err);
    }
}

const logger = (req, res, next) => {
    const logMessage = `${req.method}\t${req.headers.origin}\t${req.url}`;
    logEvents(logMessage, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };
