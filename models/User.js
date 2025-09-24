const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  password: { type: String, required: true, minlength: 8 }, // Store hashed password
  periodDate: { type: Date },
  periodRegularity: { type: String, enum: ['regular', 'irregular'], required: true },
  periodHistory: [{ startDate: Date, endDate: Date }],
  createdAt: { type: Date, default: Date.now },
  accountStatus: {
    type: String,
    enum: ['EMAIL_NON_CONFIRMED', 'EMAIL_CONFIRMED'],
    default: 'EMAIL_NON_CONFIRMED',
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to validate password during login
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};

module.exports = mongoose.model('User', userSchema);