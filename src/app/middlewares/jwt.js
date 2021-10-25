const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {

  logger.info('[JWT MID - Iniciando verificação do token]');

  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado'});
  }

  const jwtParts = authHeader.split(' ');

  if (jwtParts.length !== 2){
    return res.status(401).json({ error: 'Token com formato inválido'});
  }

  const [scheme, token] = jwtParts;

  if (scheme !== 'Bearer'){
    return res.status(401).json({ error: 'Token com prefixo inválido'});
  }

  try{
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const { userId, type } = tokenDecoded;

    req.userId = userId;
    req.userType = type;

    // console.log(tokenDecoded);

    return next();
  } catch(error){
    logger.error(error);
    return res.status(401).json({ error: 'Token está com problemas'});
  }
};



