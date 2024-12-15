const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    // Log error details to file and console
    const errorMessage = `${err.name}: ${err.message}`;
    logEvents(errorMessage, 'errLog.txt');
    console.error(err.stack);

    // Send error response
    res.status(500).json({
        error: err.message
    });
}

module.exports = errorHandler;