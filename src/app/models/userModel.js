const bcrypt = require('bcryptjs');
const mongoose = require('../../config/db');

const UserSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required: true,
    },
    email:{
      type:String,
      required: true,
    },
    password:{
      type:String,
      required: true,
      select: false,
    }
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line func-names
UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const user = mongoose.model('User', UserSchema);
module.exports = user;
