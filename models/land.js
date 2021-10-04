const connection = require('../infrastructure/connection')
const moment = require('moment')

class Lands {
  add(land, res) {
    // Pré-processamento das datas
    const soldDate = moment(land['soldDate'], 'DD/MM/YYYY').format('YYYY-MM-DD')
    const builtDate = moment(land['builtDate'], 'DD/MM/YYYY').format('YYYY-MM-DD')
    // Armazenamento das datas de criação e modificação
    const creationDate = moment().format('YYYY-MM-DD HH:MM:SS')
    const lastModifiedDate = moment().format('YYYY-MM-DD HH:mm:ss')
    land['soldDate'] = soldDate
    land['builtDate'] = builtDate
    // Variável final após processamento
    const datedLand = {...land, creationDate, lastModifiedDate}

    // Check se os valores são válidos
    const isValidSoldDate = moment(soldDate).isSameOrBefore(creationDate)
    const isValidBuiltDate = moment(builtDate).isSameOrBefore(creationDate)
    // Mensagens de erro
    const validations = [
      {
        name: 'soldDate',
        valid: isValidSoldDate,
        message: 'Must be less or equal current datetime'
      },
      {
        name: 'builtDate',
        valid: isValidBuiltDate,
        message: 'Must be less or equal current datetime'
      }
    ]
    // Caso exista erros, exibe-os e retorna
    const errors = validations.filter(field => !field.valid)
    if (errors.length > 0) {
      res.status(400).json(errors)
      return
    }

    const sql = 'INSERT INTO Land SET ?'

    connection.query(sql, datedLand, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(201).json(resultados)
      }
    })
  }
}

module.exports = new Lands
