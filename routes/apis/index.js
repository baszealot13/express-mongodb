const routes = require('express').Router();
const userRoutes = require('./users');
const regisRoutes = require('./registration');
const loginRoutes = require('./login');
const RouteProtection = require('../../helpers/RouteProtection');

routes.use('/users', RouteProtection.verify, userRoutes);
routes.use('/registration', regisRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;