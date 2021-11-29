require('dotenv').config();
const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const logger = require('./helper/logger');

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(helmet());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== 'production'){
  app.use('/images', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
}

app.use(routes);

app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).json({msg: 'Houve um erro interno na API '});
});

app.listen(port, () => logger.info(`API working on port: ${port} em ${process.env.NODE_ENV}`));

// http://localhost:3000/users
