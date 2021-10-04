class Tables {
  init(connection) {
    this.connection = connection

    this.createClients()
  }

  createClients() {
    const sql = 'CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Client` (`idClient` INT NOT NULL AUTO_INCREMENT,`cpf` VARCHAR(11) NULL,`name` VARCHAR(45) NULL,`phone` VARCHAR(14) NULL,`email` VARCHAR(45) NULL,`bankAccount` VARCHAR(45) NULL,PRIMARY KEY (`idClient`))ENGINE = InnoDB;'

    this.connection.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Tabela `Clients` criada com sucesso!")
      }
    })
  }

  createDatabase() {
    const sql = "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0; SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE ='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';"
    const createSchema = 'CREATE SCHEMA IF NOT EXISTS `gerencia_pagamentos` DEFAULT CHARACTER SET utf8 ; USE `gerencia_pagamentos` ;'

    this.connection.query(sql)
    this.connection.query(createSchema)
  }
}

module.exports = new Tables
