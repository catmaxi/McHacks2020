const crypto = require('crypto')
const User = require('../schemas/user')

const iterations = 1000

module.exports = {
  newUser: async (email, password) => {
    // build password
    const salt = crypto.randomBytes(16).toString('base64')
    const key = crypto
      .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
      .toString('base64')

    // create user
    try {
      const user = await User.create({
        email,
        password: {
          salt,
          key,
          iterations,
        },
      })
      return user
    } catch (e) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return new Error('Duplicate')
      }
      return new Error('Unknown')
    }
  },
  getUser: async (email, password) => {
    const user = await User.findOne({ email })

    // user not found
    if (!user) return new Error('Not found')

    const key = crypto
      .pbkdf2Sync(
        password,
        user.password.salt,
        user.password.iterations,
        64,
        'sha512',
      )
      .toString('base64')

    // Wrong password
    if (key !== user.password.key) return new Error('Wrong password')

    return user
  },
}
