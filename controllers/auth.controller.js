const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors} = require("../utils/errors.utils");

const MAX_AGE = 8 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        {
            expiresIn: MAX_AGE
        },
        false
    )
};

module.exports.signUp = async (req, res) => {
    const {firstName, lastName, login, email, password} = req.body;
    try {
        const user = await UserModel.create({
            firstName,
            lastName,
            login,
            email,
            password
        });
        res.status(201).json({use: user._id});
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).json({errors});
    }
};

module.exports.signIn = async (req, res) => {
    const {login, password} = req.body;
    try {
        const user = await UserModel.login(login, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge:MAX_AGE });
        res.status(200).json({ user: user._id});
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({errors});
    }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};