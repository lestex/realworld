const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./config/logger');

// Create global express app object
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// connect to DB
mongoose.connect(config.dbUrl)
    .then(() => {
        if (!config.isTest) {
            logger.info(`Connected to ${config.dbUrl}...`);
            if (config.isDevelopment) {
                mongoose.set('debug', true);
            }
        }
});

// configure logging
app.use(morgan('dev'));

// bind routes
app.use('/', router);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (!config.isProduction) {
    app.use((err, req, res) => {
        logger.info(err.stack);  
        res.status(err.status || 500);  
        res.json({'errors': {
            message: err.message,
            error: err
        }});
    });
}
  
// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: {}
    }});
});

const server = app.listen(config.port, () => {
    if (!config.isTest) {
        logger.info(`App listening on port: ${config.port}`);
    }
});

module.exports = server;
  