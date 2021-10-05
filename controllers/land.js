const Lands = require('../models/land')

module.exports = app => {
  app.get('/terrenos', (req, res) => {
    Lands.list(res)
  })

  app.post('/terrenos', (req, res) => {
    const land = req.body
    Lands.add(land, res)
  })
}
