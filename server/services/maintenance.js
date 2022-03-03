const Maintenance = require('../models/MaintenanceModel');

module.exports.GetAllMaintenance = async function () {
    const result = await Maintenance
        .find();
    if (result) {
        return result;
    }
    return null;
}


module.exports.MaintenanceCreate = async function (req) {
    const {
        name,
        email,
        unitNumber,
        serviceType,
        summary,
        details
    } = req;
    let maintenance =await new Maintenance();
    maintenance.name = name;
    maintenance.email = email;
    maintenance.unitNumber = unitNumber;
    maintenance.serviceType = serviceType;
    maintenance.summary=summary;
    maintenance.details = details;
    const result = await maintenance.save();
    if (result) {
        return result;
    }
    return result;
}

module.exports.MaintenanceClose = async function (id) {
    const result = await Maintenance
        .findOneAndUpdate({ _id: id }, {status:false})
    if (result) {
        return result;
    }
    return false;
}

module.exports.ValidateEmail = async function (email) {
    try {
        const result = await Maintenance.findOne({
            email: email.toLowerCase()
        }).exec();

        if (result) {
            return result;
        }
        return null;
    } catch (err) {
        console.error(err.message);
    }
}
module.exports.GetMaintenanceById = async function (id) {
    const result = await Maintenance
        .findById({
            _id: id,
            'stats.deleted': false
        }, {
            '__v': 0,
            'stats': 0,
            'password': 0,
            'login_attempts': 0,
            'lock_until': 0,
            'account.stats': 0,
            'account.__v': 0,
            'account.default_contact': 0
        });
    if (result) {
        return result;
    }
    return null;
}