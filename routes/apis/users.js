const express = require('express');
const { StatusCodes } = require('http-status-codes');
const errorHandler = require('http-errors');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();

        res.json(users)
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = router;
