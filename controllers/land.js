const Lands = require('../models/land')

module.exports = app => {
  app.get('/terrenos', (req, res) => {
    Lands.getAll(res)
  })

  app.get('/terrenos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Lands.getById(id, res)
  })

  app.post('/terrenos', (req, res) => {
    const land = req.body
    Lands.add(land, res)
  })

  app.patch('/terrenos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    Lands.update(id, values, res)
  })

  app.delete('/terrenos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Lands.delete(id, res)
  })
}
