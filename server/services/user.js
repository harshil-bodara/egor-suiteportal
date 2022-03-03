const bcrypt = require("bcryptjs")
const User = require('../models/AuthModel');

module.exports.ValidateEmail = async function (email) {
    try {
        const result = await User.findOne({
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

module.exports.ValidateUsername = async function (username) {
    try {
        const userName = await User.findOne({
            username: username.toLowerCase()
        }, {
            '__v': 0,
            'password': 0,
            'deleted': 0,
            'updated_by': 0,
        }).exec();
        if (userName) {
            return userName;
        }
        return null;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports.UserCreate = async function (req) {
    const {
        username,
        name,
        email,
        password,
        role,
    } = req;
    let user =await new User();
    const salt = bcrypt.genSaltSync(10)
    user.username = username.toLowerCase();
    user.name = name;
    user.email = email;
    user.role = role;
    user.password = await bcrypt.hash(password,  parseInt(salt));
    const result = await user.save();
    if (result) {
        return result;
    }
    return result;
}

module.exports.GetUserById = async function (id) {
    const result = await User
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