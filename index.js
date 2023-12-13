require('dotenv').config()
const sequelize = require('./db')
const cors = require('cors')
const express = require('express')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const ApiError = require('./error/ApiError')
const fileUpload = require('express-fileupload')
const path = require('path')
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middleware/logger');
const limiter = require('./middleware/rateLimiter');

const PORT = process.env.PORT || 5001

const app = express()
app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(requestLogger);
app.use(limiter);
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/static', express.static('./static'));
app.use('/api', router)
app.use(errorLogger);
app.use(errors());
//обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`приложение запущено на порту ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()

