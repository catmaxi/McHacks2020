const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
})

exports.userSchema = userSchema
