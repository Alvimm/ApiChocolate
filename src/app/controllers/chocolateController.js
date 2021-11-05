const chocolateModel = require('../models/chocolateModel');

class ChocolateController {
  async store(req, res){

    // const { key } = req.file;

    // req.body.image = `${process.env.URL_HOST}/images/${key}`;

    const chocolate = await chocolateModel.create(req.body);

    return res.status(201).json({ chocolate });
  }

  async index(req, res){
    const chocolates = await chocolateModel.find();
    return res.json({ chocolates });
  }

  async delete(req, res){
    const { id } = req.params;
    await chocolateModel.findByIdAndDelete(id);
    return res.json({msg:'Chocolate deletado com sucesso'});
  }

  async update(req, res){
    const { id } = req.params;
    const chocolate = await chocolateModel.findByIdAndUpdate(id, req.body, {
      new: true
    });

    return res.json({ chocolate });
  }

  async show (req, res){
    const { id } = req.params;
    const chocolate = await chocolateModel.findById(id);
    return res.json({ chocolate });
  }
}

module.exports = new ChocolateController();
