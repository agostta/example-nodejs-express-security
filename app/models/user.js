var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('User', new Schema({ 
    date: Date,
    testString: String,
    testNumber: Number,
}));
