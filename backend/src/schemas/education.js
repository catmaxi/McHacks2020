const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  startingYear: Number,
  endingYear: Number,
  description: String,
  institution: String,
})

const education = mongoose.model('education', userSchema)
module.exports = education
