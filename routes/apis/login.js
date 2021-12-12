const express = require('express');
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');

router.post('/', async (req, res, next) => {
    try {
        const user = await User.findOne({ user_email: req.body.user_email });

        if (!user) {
            next(errorHandler(StatusCodes.NOT_FOUND), 'No user found');
        }

        if (!await bcrypt.compare(req.body.user_password, user.user_password)) {
            next(errorHandler(StatusCodes.UNAUTHORIZED), 'Invalid credentials');
        }

        const token = jwt.sign({ _id: user._id }, process.env.SIGN_SECRET)
        const { user_password, ...data } = user.toJSON();

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });

        res.json({
            user: data,
            token: token
        });
    } catch (error) {
        console.log(error);
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = router;