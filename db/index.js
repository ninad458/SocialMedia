const mongoose = require('mongoose');

const loadModels = () => {
    require('../app/model/User')
}

module.exports = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected")
    });
    loadModels()
}