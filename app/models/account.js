var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var accountSchema = new Schema({ 
    accid: String,
    date: Date,
    name: String
});
var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
