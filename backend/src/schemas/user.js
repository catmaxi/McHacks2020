const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  accountType: String, // 'student' | 'recruiter'
  email: String,
  password: {
    salt: String,
    key: String,
    iterations: Number,
  },
  firstName: String,
  lastName: String,
})

const User = mongoose.model('User', userSchema)
module.exports = User
