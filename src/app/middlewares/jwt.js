const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {

  logger.info('[JWT MID - Starting token verification]');

  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not sent'});
  }

  const jwtParts = authHeader.split(' ');

  if (jwtParts.length !== 2){
    return res.status(401).json({ error: 'Token with invalid format'});
  }

  const [scheme, token] = jwtParts;

  if (scheme !== 'Bearer'){
    return res.status(401).json({ error: 'Token with invalid prefix'});
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
    return res.status(401).json({ error: 'Token is having issues'});
  }
};



