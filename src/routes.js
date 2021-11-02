const routes = require('express').Router();
const multer = require('multer');
const userController = require('./app/controllers/userController');
const chocolateController = require('./app/controllers/chocolateController');
const jwt = require('./app/middlewares/jwt');
const multerConfig = require('./config/multer');
// const validators = require('./app/middlewares/validators');

routes.post('/users', userController.store);
routes.post('/login', userController.auth);

routes.use(jwt);

routes.get('/users', userController.index);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);
routes.get('/users/:id', userController.show);

routes.get('/chocolates', chocolateController.index);
routes.post('/chocolates', multer(multerConfig).single('file'), chocolateController.store);
routes.put('/chocolates/:id', chocolateController.update);
routes.delete('/chocolates/:id', chocolateController.delete);
routes.get('/chocolates/:id', chocolateController.show);

module.exports = routes;
