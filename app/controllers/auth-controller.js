'use strict';

var ctrl = {};
var jwt = require('jsonwebtoken');
var Account = require("../models/account");
var config = require("../../config");
var uuidV4 = require("uuid/v4");

ctrl.map = [];

/**
 * Auth endpoint
 */ 
ctrl.authenticate = function(req, res) {
    var accid = req.body.accid;
    accid ? ctrl.findAccount(req, res)
        : ctrl.createAccount(req, res);
};

/**
* Find
*/
ctrl.findAccount = function(req, res){
    var accid = req.body.accid;
    
    Account.findOne({ accid: accid }).then((data) => {
        var token = ctrl.newToken(accid);
        res.json({ success: true, token: token});
    })
    .catch((err) => {
        res.status(500).json({ success: false, error:err });
    });
}

/**
* Create
*/
ctrl.createAccount = function(req, res){
    var acc = new Account({ 
        accid: uuidV4(),
        date: new Date()
    });
    acc.save().then( (data) => {
        var token = ctrl.newToken(acc.accid);
        console.log('New account created.');
        res.json({ success: true, token: token, accid:acc.accid });
    })
    .catch( (err) => {
        res.status(500).json({ success: false, error:err });
    });
}

ctrl.verify = function(req, res, next) {

    const tokenNotProvided = {
        success: false,
        message: 'No token provided.'
    };

    const failedAuthentication = {
        success: false,
        message: 'Failed to authenticate token.'
    };

    var token = ctrl.getToken(req);

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json(failedAuthentication);
            }
            else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send(tokenNotProvided);
    }
}

ctrl.getToken = function(req){
    // check header or url parameters or post parameters for token
    return req.body.token || req.query.token || req.headers['x-access-token'];
};

ctrl.getAccid = function(req){
    var token = ctrl.getToken(req);
    var e = ctrl.map.find( i=> i.token == token);
    return e ? e.accid : null;
};

ctrl.loadAccid = function(req, res, next){
    var accid = ctrl.getAccid(req);
    
    if(accid){
        req.accid = accid;
        next();
    }
    else
        res.status(404).json({ success: false, error:'accid not found.' });
}


ctrl.cors = function(req, res, next){
    var ip = "200.44.78.126";
    res.header("Access-Control-Allow-Origin", ip);
    res.header("Access-Control-Allow-Headers", ip);    
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}

ctrl.newToken = function(accid){
    var token = jwt.sign({ payload : accid }, config.secret);
    ctrl.map.push( {token:token.toString(), accid:accid} );
    return token;
}

module.exports = ctrl;
