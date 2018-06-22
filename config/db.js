const mongoose = require('mongoose');
const config = require('../config');

dbUrl = 'mongodb://localhost/' + config.dbName;

module.exports = function() {
    mongoose.connect(dbUrl).
        then(() => console.log('connected to', dbUrl));
};
