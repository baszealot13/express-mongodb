const express = require('express');
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('http-errors');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User');

router.post('/', async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPaswd = await bcrypt.hash(req.body.user_password, salt);
    try {
        const user = new User({
            user_email: req.body.user_email,
            user_password: hashedPaswd
        });

        const uesrCreated = await user.save();
        const { user_password, ...data } = uesrCreated.toJSON();

        res.status(StatusCodes.CREATED);
        res.send(data);
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = router;