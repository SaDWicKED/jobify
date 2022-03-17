import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide name'],
    minlength: 3,
    maxLength: 20,
    trim: true,
  },
  email: { 
    type: String, 
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    },
    unique: true,
  },
  password: { 
    type: String, 
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: { 
    type: String, 
    maxLength: 20,
    trim: true,
    default: 'lastName',
  },
  location: { 
    type: String, 
    maxLength: 20,
    trim: true,
    default: 'my city',
  },
});

UserSchema.pre('save', async function(next){
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function() {
  console.log(process.env);
  return jwt.sign(
    {userId: this._id}, 
    process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_LIFETIME});
};

export default mongoose.model('User', UserSchema);