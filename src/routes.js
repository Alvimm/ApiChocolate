const routes = require('express').Router();
const multer = require('multer');
const userController = require('./app/controllers/userController');
const chocolateController = require('./app/controllers/chocolateController');
const jwt = require('./app/middlewares/jwt');
const multerConfig = require('./config/multer');
const validators = require('./app/middlewares/validators');


routes.post('/login', userController.auth);

routes.use(jwt);

routes.get('/users', userController.index);
routes.post('/users', validators.userCreateValidator, userController.store);
routes.put('/users/:id', validators.userUpdateValidator, userController.update);
routes.delete('/users/:id', userController.delete);
routes.get('/users/:id', userController.show);

routes.get('/chocolates', chocolateController.index);
routes.post('/chocolates', validators.chocolateValidator, multer(multerConfig).single('file'), chocolateController.store);
routes.put('/chocolates/:id', validators.chocolateValidator, chocolateController.update);
routes.delete('/chocolates/:id', chocolateController.delete);
routes.get('/chocolates/:id', chocolateController.show);

module.exports = routes;
