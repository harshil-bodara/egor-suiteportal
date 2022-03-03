let express = require('express');
var router = express.Router();

let userController = require('../controllers/UserController');

router.post('/create', userController.Create);
router.post('/login', userController.Login);

module.exports = router;