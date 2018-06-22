const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const config = require('./config');
const dbConn = require('./config/db');
const isProduction = process.env.NODE_ENV === 'production';

// Create global express app object
const app = express();

// connect to DB
dbConn();

// configure logging
app.use(morgan('dev'));

app.use('/', router);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use((err, req, res, next) => {
        console.log(err.stack);  
        res.status(err.status || 500);  
        res.json({'errors': {
            message: err.message,
            error: err
        }});
    });
  }
  
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: {}
    }});
});

app.listen(config.port, () => {
    console.log('App listening on port =', config.port);
});
  