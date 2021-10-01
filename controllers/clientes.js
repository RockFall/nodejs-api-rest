module.exports = app => {
  app.get('/clientes', (req, res) => res.send('Você está na rota de clientes e realizando um GET'))

  app.post('/clientes', (req, res) => {
    console.log(req.body)
    res.send('Você está na rota de clientes e realizando um POST')
  })
}
