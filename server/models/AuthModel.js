const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    minlength: 5,
    maxlength: 10,
  },
},{
  timestamps:true
});

const User = mongoose.model("User", AuthSchema);
module.exports = User;