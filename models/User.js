import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

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

export default mongoose.model('User', UserSchema);