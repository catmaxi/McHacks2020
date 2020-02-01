const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const education = require('.');

const userSchema = new Schema({
  accountType: String, // 'student' | 'recruiter'
  email: {
    type: String,
    primary: true,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    salt: String,
    key: String,
    iterations: Number,
  },
  firstName: String,
  lastName: String,
  education: [
    {
      name: String,
      startingYear: Number,
      endingYear: Number,
      description: String,
      institution: String,
    },
  ],
})

const User = mongoose.model('User', userSchema)
module.exports = User
