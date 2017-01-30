'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-controller');


router.use(auth.cors);
router.post('/', auth.authenticate);
router.get('/test', (req, res) => { res.json({success: true, message:'Token valid'});}); 
 

module.exports = router; 
  