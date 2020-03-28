const generateUniqueId = () => {
  const crypto = require('crypto')
  return crypto.randomBytes(4).toString('HEX')
}

module.exports = generateUniqueId