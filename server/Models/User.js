const mongoose = require("mongoose");
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: {
   type: String,
   required: true
  },
  email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true,
   validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
   type: String,
   required: true,
   minlength: [8, 'Password must be at least 8 characters long'],
   maxlength: [128, 'Password must be less than 128 characters long']
  },
  age:{
    type:Number,
    required:true
  },
  height:{
    type:Number,
    required:true
  },
  neck:{
    type:Number,
    required:true
  },
  waist:{
    type:Number,
    required:true
  },
  weight:{
    type:Number,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  activity: {
   type: Date,
   default:Date
  },
});
module.exports = mongoose.model("User", UserSchema);