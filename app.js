const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');

const isProduction = process.env.NODE_ENV === 'production';

// Create global express app object
const app = express();

// configure logging
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/test');

console.log(app.get('env'));    

const port = process.env.PORT || 3000;

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
    app.use(function(err, req, res, next) {
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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });

app.listen(port, () => {
    console.log('Example app listening on port =', port);
});
  