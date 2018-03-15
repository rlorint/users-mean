var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  name: String,
  surname: String,
  email: String,
  phone: String,
  position: String
});

exports.User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/usersdb', ((err,db) => {
  if(err) {
    console.log("Error connecting to db");
    process.exit(1);
  }
  console.log("Connected to MongoDb");
}));
