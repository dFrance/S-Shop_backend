const { Router } = require('express')

const UserController = require('./Controller/UserController')
const ProductController = require('./Controller/ProductController')
const LoginController = require('./Controller/LoginController')
const AuthMiddleware = require('./Middlewares/AuthMiddleware')

const routes = new Router();

routes.post('/user/novo', UserController.addUser);
routes.post('/login', LoginController.login);
routes.post('/product', ProductController.store);
routes.delete('/product', ProductController.deleteProduct);
routes.get('/product', ProductController.getProducts);

module.exports = routes;