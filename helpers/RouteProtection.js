const errorHandler = require("http-errors");
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

class RouteProtection {
    static async verify(req, res, next) {
        try {
            const auth = req.headers.authorization || req.headers.Authorization;
            const token = auth.split(' ')[1];
            const claims = jwt.verify(token, process.env.SIGN_SECRET);

            return next();
        } catch (error) {
            console.log('RouteProtection.error ', error);
            return next(errorHandler(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
        }

    }
}

module.exports = RouteProtection