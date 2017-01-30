var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('MenuInfo', 
    new Schema({ 
        testArray:[ {id:String, slot:String} ]
    })
);
