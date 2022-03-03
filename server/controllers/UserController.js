let User = require('../models/AuthModel');
let {
    ValidateEmail,
    ValidateUsername,
    UserCreate,
    GetUserById
} = require('../services/user.js');
const AuthService = require('../services/auth');


module.exports = {
    Create: async function (req, res) {
        const {
            username,
            email,
        } = req.body;

        // validate email
        if (email) {
            const isEmail = await ValidateEmail(email);
            if (isEmail) return res.status(403).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        if (username) {
            // validate username
            const isUsername = await ValidateUsername(username);
            if (isUsername) return res.status(403).json({
                success: false,
                message: 'Username is already registered'
            });
        }

        // create user
        try {
            const user = await UserCreate(req.body);
            return res.status(200).json({
                success: true,
                data: await GetUserById(user._id)
            });
        } catch (err) {
            console.log('create user : ', err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    Login: async function (req, res) {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await ValidateEmail(email);
            if (!user) {
                return res.status(200).send({
                    success: false,
                    error: 'Email does not exist!'
                });
            }
            const token = await AuthService.login(user, password)
            if(token?.success === false)
            {
                return res.status(200).send(token);
            }
            return res.status(200).send({
                success: true,
                message:"you have successfully logged In!",
                data: {
                    user:{email:user?.email, role:user?.role},
                    token
                }
            });
        } catch (error) {
            console.log('login : ', error);
            res.status(500).send({
                success: false,
                message: error
            });
        }
    },
}