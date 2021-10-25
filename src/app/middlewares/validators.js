const yup = require('yup');

class Validators{
  async userCreateValidator(req, res, next){
    const userMask = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    const userValidate = await userMask.isValid(req.body, { strict: true });

    if(!userValidate){
      return res.status(400).json({ msg: 'Dados estão num formato inválido'});
    }

    return next();
  }

  async userUpdateValidator(req, res, next){
    const userMask = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    const userValidate = await userMask.isValid(req.body, { strict: true });

    if(!userValidate){
      return res.status(400).json({ msg: 'Dados estão num formato inválido'});
    }

    return next();
  }

  async chocolateValidator(req, res, next){
    const chocolateMask = yup.object().shape({
      name: yup.string().required(),
      value: yup.string().required(),
    });

    const chocolateValidate = await chocolateMask.isValid(req.body, { strict: true });

    if(!chocolateValidate){
      return res.status(400).json({ msg: 'Dados incorretos'});
    }

    return next();
  }
}

module.exports = new Validators();



