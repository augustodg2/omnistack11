const db_connection = require('../database/connection')

module.exports = {
  index: async (request, response) => {
    const ong_id = request.headers.authorization
    console.log(ong_id);
    
    const incidents = await db_connection('incidents')
      .where('ong_id', ong_id)

    return response.json(incidents)
  }
}
