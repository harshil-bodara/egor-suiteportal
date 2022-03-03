let User = require('../models/AuthModel');
let { MaintenanceCreate,GetMaintenanceById,ValidateEmail,GetAllMaintenance,MaintenanceClose } = require('../services/maintenance');
const AuthService = require('../services/auth');


module.exports = {
    get: async function (req, res) {
        try {
            return res.status(200).json({
                success: true,
                data: await GetAllMaintenance(),
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }
    },
    Create: async function (req, res) {
        const {
            email
        } = req.body;

        // validate email
        if (email) {
            const isEmail = await ValidateEmail(email);
            if (isEmail) return res.status(200).json({
                success: false,
                error: 'Email is already registered'
            });
        }

        // create maintenance
        try {
            const user = await MaintenanceCreate(req.body);
            return res.status(200).json({
                success: true,
                data: await GetMaintenanceById(user._id)
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    },
    update: async function (req, res) {
        try {
            const { id } = req.params;
            const maintenance = await MaintenanceClose(id);
            if (maintenance) {
                return res.status(200).json({
                    success: true,
                    data: await GetMaintenanceById(id),
                    message: "Maintenance close successfully!"
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    error: "Maintenance not close successfully!"
                });
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err,
            });
        }
    },
}