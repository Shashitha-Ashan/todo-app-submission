const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config/config');
const connectDB = require('./config/database');

const { requestLogger } = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const todoRoutes = require('./routes/todoRoutes');

const { sendResponse } = require('./utils/responseFormatter');


const app = express();
const PORT = config.PORT;

connectDB();
app.use(cors(config.CORS));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(requestLogger);


app.get('/api/health', (req, res) => {
    sendResponse(res, 200, true, 'Server is running', {
        status: 'healthy',
        uptime: process.uptime(),
        environment: config.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

app.use('/api/todos', todoRoutes);

app.use(notFoundHandler);

app.use(errorHandler);


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;