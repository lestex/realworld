const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./config/logger');

// Create global express app object
const app = express();

// connect to DB
if (config.isProduction) {
    mongoose.connect(config.dbUrl)
        .then(() => logger.info(`Connected to ${config.dbUrl}...`));
} else {
    mongoose.connect(config.dbUrl)
        .then(() => logger.info(`Connected to ${config.dbUrl}...`));
    mongoose.set('debug', true);
}

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
    logger.info('App listening on port =', config.port);
});

module.exports = server;
  