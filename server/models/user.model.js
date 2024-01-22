import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    unique: true,
  }
}, {
  timestamps: true,
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verifyPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
}

export default mongoose.model('User', userSchema);
