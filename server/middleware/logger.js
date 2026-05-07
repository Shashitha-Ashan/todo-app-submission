const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`Headers:`, {
        userAgent: req.get('user-agent'),
        contentType: req.get('content-type')
    });

    const originalJson = res.json;
    res.json = function (data) {
        const duration = Date.now() - startTime;
        console.log(`Response: ${res.statusCode} (${duration}ms)\n`);
        return originalJson.call(this, data);
    };

    next();
};

module.exports = {
    requestLogger
};
