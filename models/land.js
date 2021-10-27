const connection = require('../infrastructure/connection')
const moment = require('moment')

class Lands {

  // Adds a new Land into the database
  add(land, res) {

    // Pre-processing of dates
    const soldDate = moment(land['soldDate'], 'DD/MM/YYYY').format('YYYY-MM-DD')
    const builtDate = moment(land['builtDate'], 'DD/MM/YYYY').format('YYYY-MM-DD')

    const creationDate = moment().format('YYYY-MM-DD HH:MM:SS')
    const lastModifiedDate = moment().format('YYYY-MM-DD HH:mm:ss')
    land['soldDate'] = soldDate
    land['builtDate'] = builtDate

    // Final variable
    const datedLand = {...land, creationDate, lastModifiedDate}

    // Check if inputs are valid
    const isValidSoldDate = moment(soldDate).isSameOrBefore(creationDate)
    const isValidBuiltDate = moment(builtDate).isSameOrBefore(creationDate)
    const validations = [
      {
        name: 'soldDate',
        valid: isValidSoldDate,
        message: 'Must be less or equal current datetime',
        soldDate: soldDate,
        creationDate: creationDate
      },
      {
        name: 'builtDate',
        valid: isValidBuiltDate,
        message: 'Must be less or equal current datetime',
        soldDate: builtDate,
        creationDate: creationDate
      }
    ]

    // If any errors, returns them
    const errors = validations.filter(field => !field.valid)
    if (errors.length > 0) {
      res.status(400).json(errors)
      return
    }

    // Insertion query
    const sql = 'INSERT INTO Land SET ?'
    connection.query(sql, datedLand, (err, results) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(datedLand)
      }
    })
  }

  // Returns a list of all lands
  getAll(res) {
    const sql = 'SELECT * FROM land'

    connection.query(sql, (err, results) => {
      if (err)
        res.status(400).json()
      else
        res.status(200).json(results)
    })
  }

  // Return a land based on given ID
  getById(id, res) {
    const sql = `SELECT * FROM land WHERE idLand =${id}`

    connection.query(sql, (err, results) => {
      const land = results[0]
      if (err)
        res.status(400).json(err)
      else
        res.status(200).json(land)
    })
  }

  // Updates data from land
  update(id, values, res) {
    if (values.soldDate) {
      values.soldDate = moment(values.soldDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    } if (values.builtDate) {
      values.builtDate = moment(values.builtDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }

    const lastModifiedDate = moment().format('YYYY-MM-DD HH:mm:ss')
    values = {...values, lastModifiedDate}

    const sql = `UPDATE land SET ? WHERE idLand=?`

    connection.query(sql, [values, id], (err, results) => {
      if (err)
        res.status(400).json(err)
      else
        res.status(200).json({...values, id})
    })
  }

  // Deletes data with given id
  delete(id, res) {
    const sql = `DELETE FROM land WHERE idLand=?`

    connection.query(sql, id, (err, results) => {
      if (err)
        res.status(400).json(err)
      else
        res.status(200).json({id})
    })
  }
}

module.exports = new Lands
