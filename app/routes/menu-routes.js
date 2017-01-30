'use strict';
const router = require('express').Router();
const ctrl = require('../controllers/menu-controller');
const auth = require('../controllers/auth-controller');

router.use(auth.verify);
router.use(auth.cors);
router.get('/', ctrl.getMenu ); 


module.exports = router; 
