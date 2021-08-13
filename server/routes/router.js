const express = require('express');
const route = express.Router()
const services = require('../services/render')

const controller = require('../controler/controller')
/**
 * @description Root Route
 * @method GET /
 */

route.get('/',services.homeRoutes)

/**
 * @description add users
 * @method GET / add_user
 */

route.get('/add_user', services.add_user)

/**
 * @description update page
 * @method GET / update_page
 */

route.get('/update_page', services.update_page)

//api
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route