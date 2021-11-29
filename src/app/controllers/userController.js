const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const mailConfig = require('../../config/mail');
const logger = require('../../helper/logger');

class UserController{

  async store(req, res){
    const { email, name } = req.body;
    const user = await userModel.create(req.body);

    logger.info(`[userController] - Creating a new user: ${email}`);

    user.password = undefined;

    await mailConfig.sendMail({
      to: email,
      from: 'filipe2012alvim@gmail.com',
      subject: 'New user register',
      template: 'registerUser',
      text: 'New user register',
      context: {
        message: 'Variable value test',
        user: name,
        email,
      }
    });

    return res.status(201).json({ user });
  }

  async index(req, res){
    const users = await userModel.find();
    return res.json({users});
  }

  async show (req, res){
    const { id } = req.params;
    const user = await userModel.findById(id);
    return res.json({ user });
  }

  async delete(req, res){
    const { id } = req.params;
    logger.info(`Req to delete user: ${id}`);
    await userModel.findByIdAndDelete(id);
    return res.json({ msg: 'User has been deleted successfully!' });
  }

  async update(req, res){

    const { id } = req.params;

    delete req.body.password;

    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    await mailConfig.sendMail({
      to: user.email,
      from: 'filipe2012alvim@gmail.com',
      subject: 'Edited register',
      template: 'editUser',
      text: 'Your register has been edited',
      context: {
        user: user.name,
      },
    });

    return res.json({ user });
  }

  async auth(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('password');

    if(!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const correctUser = await bcrypt.compare(password, user.password);

    if(!correctUser) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const { _id: id} = user;

    const token = jwt.sign(
      { userId: id, type: 'admin' },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    return res.status(201).json({ token });
  }
}

module.exports = new UserController();
