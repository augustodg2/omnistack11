const db_connection = require('../database/connection')

module.exports = {
  index: async (request, response) => {
    const { page = 1 } = request.query

    const [count] = await db_connection('incidents').count()

    const incidents = await db_connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page-1) * 5)
      .select([
        'incidents.*',
        'ongs.name as ong_name',
        'ongs.email as ong_email',
        'ongs.whatsapp as ong_whatsapp',
        'ongs.city as ong_city',
        'ongs.uf as ong_uf'
      ])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
  },
  get: async (request, response) => {

  },
  create: async (request, response) => {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization
    
    const [id] = await db_connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return response.json({ id })
  },
  update: async (request, response) => {

  },
  delete: async (request, response) => {
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incident = await db_connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (!incident) {
      return response.status(412).json({ error: 'Incident not exists.' })
    }

    if (ong_id !== incident.ong_id) {
      return response.status(401).json({ error: 'Operation not permited.' })
    }

    const query = await db_connection('incidents').where('id', id).del()
    
    return response.status(204).send()
  },
}