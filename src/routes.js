const { Router } = require('express')

const UserController = require('./Controller/UserController')
const ProductController = require('./Controller/ProductController')
const LoginController = require('./Controller/LoginController')
const AuthMiddleware = require('./Middlewares/AuthMiddleware')

const routes = new Router();

routes.post('/user/novo', UserController.addUser);
routes.post('/login', LoginController.login);
routes.post('/product', AuthMiddleware, ProductController.store);
routes.get('/product', AuthMiddleware, ProductController.getProducts);

module.exports = routes;