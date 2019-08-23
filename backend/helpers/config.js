const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/appData', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

module.exports = {
    User: require('../models/users'),
    Event:require('../models/events')
};
