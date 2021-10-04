const Lands = require('../models/land')

module.exports = app => {
  app.get('/terrenos', (req, res) => res.send('Você está na rota de terrenos e realizando um GET'))

  app.post('/terrenos', (req, res) => {
    const land = req.body

    Lands.add(land, res)
  })
}
