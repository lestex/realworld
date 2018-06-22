const mongoose = require('mongoose');
const config = require('../config');

module.exports = function() {
    mongoose.connect(config.dbUrl).
        then(() => console.log(`Connected to ${config.dbUrl}...`));
};
