const crypto = require('crypto')
const db_connection = require('../database/connection')

module.exports = {
  index: async (request, response) => {
    const ongs = await db_connection('ongs').select('*')
    return response.json(ongs)
  },
  get: async (request, response) => {

  },
  create: async (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body
    const id = crypto.randomBytes(4).toString('HEX')

    await db_connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
    
    return response.json({ message: 'OK', id })
  },
  update: async (request, response) => {

  },
  delete: async (request, response) => {

  },
}