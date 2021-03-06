const db_connection = require('../database/connection')

module.exports = {
  create: async (request, response) => {
    const { id } = request.body
    const ong = await db_connection('ongs')
      .where('id', id)
      .select('name')
      .first()

    if (!ong) {
      return response.status(400)
        .json({ error: 'No ONG found with this id' })
    }

    return response.json(ong)
  }
}