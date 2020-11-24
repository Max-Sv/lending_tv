const express = require('express');
const cors = require('cors');
const smsRouter = require('./routers/sms.router')
const errorHandler = require('./error/error.handler')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', (req, res, next) => {
    if ( req.originalUrl === '/') {
        res.send('server is running');
        return;
    }
    next();
})
app.use('/sms', smsRouter);
app.use(errorHandler);
module.exports = app;