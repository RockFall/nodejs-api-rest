const customExpress = require('./config/customExpress')
const connection = require('./infrastructure/connection')

connection.connect(erro => {
  if (erro) {
    console.log("Um erro ocorreu ao se conectar no databse")
    console.log(erro)
  } else {
    console.log("Conectado ao database com sucesso!")

    const app = customExpress()
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
  }
})


