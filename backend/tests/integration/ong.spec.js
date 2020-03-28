const request = require('supertest')
const app = require('../../src/app')
const dbConnection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await dbConnection.migrate.rollback()
    await dbConnection.migrate.latest()
  })

  afterAll(async () => {
    await dbConnection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD",
        email: "contato@apad.com",
        whatsapp: "5573999999999",
        city: "Rio do Sul",
        uf: "SC"
      })
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
