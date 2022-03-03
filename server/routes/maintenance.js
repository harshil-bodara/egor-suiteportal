let express = require('express');
var router = express.Router();

// middleware
let Auth = require('../middleware/auth');

let maintenanceController = require('../controllers/MaintenanceController');

router.get('/',Auth,maintenanceController.get);
router.post('/', maintenanceController.Create);
router.put('/:id/close',Auth, maintenanceController.update);

module.exports = router;