const dbConnection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  index: async (request, response) => {
    const ongs = await dbConnection('ongs').select('*')
    return response.json(ongs)
  },
  create: async (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body
    const id = generateUniqueId()

    await dbConnection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
    
    return response.json({ message: 'OK', id })
  },
}