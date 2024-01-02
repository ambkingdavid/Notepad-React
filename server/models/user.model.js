import mongoose from 'mongoose';
import validator from 'validator';


const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: validator.isEmail,
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
