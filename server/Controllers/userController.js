
const { default: mongoose } = require("mongoose");
const User = require("../Models/User");
var UserSchema=mongoose.UserSchema
const jwt=require("jsonwebtoken")
const validator = require('validator');
// Register User
const registerUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age:req.body.age,
      height:req.body.height,
      neck:req.body.neck,
      waist:req.body.waist,
      weight:req.body.weight,
      gender:req.body.gender,
      
    };
    console.log(user);

    // Check if the user is already registered.
    const existingUser = await User.findOne({ email: user.email });
    

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Create User
    await User.create(user)
      .then((user) => {
        res.status(201).json({
          message: "Registration successful",
          user:{
            name:user.name,
            email: user.email,
            age:user.age,
            height:user.height,
            neck:user.neck,
            waist:user.waist,
            weight:user.weight,
            gender:user.gender,
            activity:user.activity,
          },
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Invalid Email or Password",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email ,password});
    const token=jwt.sign({user},'my_secret_key')
    

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Check if the provided password matches the stored password
    if (user.password === password) {
      return res.status(200).json({
        message: "Login successful",
        user: {
            id:user._id,
            name:user.name,
            email: user.email,
            age:user.age,
            height:user.height,
            neck:user.neck,
            waist:user.waist,
            weight:user.weight,
            gender:user.gender,
            activity:user.activity,
            
            
        },
        token:token
      });
      
    } else {
      return res.status(401).json({
        message: "Email or password incorrect",
      
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
  
  
};


module.exports = {
  registerUser,
  loginUser,
};
