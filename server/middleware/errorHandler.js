const { sendResponse } = require('../utils/responseFormatter');

const notFoundHandler = (req, res) => {
    sendResponse(res, 404, false, `Endpoint not found: ${req.method} ${req.originalUrl}`, null);
};


const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    sendResponse(res, statusCode, false, message, null);
};

module.exports = {
    notFoundHandler,
    errorHandler
};
