const express = require('express');
const { register, signin } = require('../controller/auth');
const router = express.Router();
const User=require('../models/user')

router.post('/register', register);

router.post("/signin", signin);







module.exports = router;
