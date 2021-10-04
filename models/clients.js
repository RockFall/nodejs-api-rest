const connection =  require('../infrastructure/connection')

class Clients {
  add(client) {
    /*
    const sql = 'BEGIN '
    'IF NOT EXISTS (SELECT * FROM Client '
    '                WHERE idClient = @_DE '
    '   BEGIN '
    '    INSERT INTO EmailsRecebidos (De, Assunto, Data) '
    '    VALUES (@_DE, @_ASSUNTO, @_DATA) '
    '   END '
    'END '
*/
    const sql = 'INSERT INTO Client SET ?'

    connection.query(sql, client, (erro, resultados) => {
      if (erro) {
        console.log(erro)
      } else {
        console.log(resultados)
      }
    })
  }
}

module.exports = new Clients
