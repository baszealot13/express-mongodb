const express = require('express');
const router = express.Router();
const Greeting = require('../../helpers/Greeting');
const moment = require('moment');

router.get('/', async (req, res, next) => {
    try {
        const sayHi = new Greeting(moment());

        res.json({
            greeting: sayHi.sayGreeting()
        });
    } catch (error) {
        next(errorHandler(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
});

module.exports = router;