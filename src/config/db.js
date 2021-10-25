const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;


// mongodb://<user>:<password>@<host>/<base>

// mongodb://api-chocolate:ap1ch0c0l4t3@mongodb.community.com/apichocolate
