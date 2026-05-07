function sendResponse(res, statusCode, success, message, data = null) {
    const response = {
        success,
        message,
        statusCode,
        timestamp: new Date().toISOString()
    };

    if (data !== null) {
        response.data = data;
    }

    res.status(statusCode).json(response);
}

module.exports = {
    sendResponse
};
