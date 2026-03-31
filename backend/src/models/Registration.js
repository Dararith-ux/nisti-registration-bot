import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    // Telegram user id is used to prevent duplicate registrations.
    telegramId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    telegramUsername: {
      type: String,
      default: ''
    },
    telegramFirstName: {
      type: String,
      default: ''
    },
    telegramLastName: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other']
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
