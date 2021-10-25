const mongoose = require('../../config/db');

const chocolateSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const chocolate = mongoose.model('Chocolate', chocolateSchema);
module.exports = chocolate;
