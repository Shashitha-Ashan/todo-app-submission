module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    SERVER: {
        HOST: 'localhost',
        TIMEOUT: 30000
    },

    CORS: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },

    API: {
        BASE_URL: '/api',
        VERSION: 'v1'
    },

    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
