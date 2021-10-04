const Clients = require('../models/clients')

module.exports = app => {
  app.get('/clientes', (req, res) => res.send('Você está na rota de clientes e realizando um GET'))

  app.post('/clientes', (req, res) => {
    const client = req.body

    Clients.add(client)

    res.send('Você está na rota de clientes e realizando um POST')
  })
}
