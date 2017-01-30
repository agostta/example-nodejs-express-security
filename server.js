var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('./config'); 


var port = process.env.PORT || 8080;

// Conecta na base de dados
mongoose.connect(config.database); 

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgar log
app.use(morgan('dev'));

// secret variable
app.set('superSecret', config.secret); 

//routes
app.use('/auth', require('./app/routes/auth-routes'));
app.use('/user', require('./app/routes/user-routes'));


// start
app.listen(port);
console.log('Application is running at: https://...:' + port);
