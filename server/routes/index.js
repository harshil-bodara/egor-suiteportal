const express = require('express');
const router = express.Router();

//select the router file
var userRouter = require('./user');
var maintenanceRouter = require('./maintenance');

router.use('/admin', userRouter);
router.use('/maintenance-requests', maintenanceRouter);

module.exports = router;