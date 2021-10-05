const fs = require('fs');
const path = require('path')

class Tables {
  init(connection) {
    this.connection = connection

    /*
    this.createClient()
    this.createCondo()
    this.createDebt()
    this.createLand()
    this.createInstallment()*/

    this.setCurrentDB(this.createDBFromSQLFile.bind(this))
  }

  // Caso o Scheme 'gerencia_pagamentos', apenas retorna uma mensagem de sucesso
  // Caso não exista, cria=o a partir de um arquivo dado
  createDBFromSQLFile(data) {
    if (data == 'refused') {
      let queries = fs.readFileSync(path.join('./db_generation_script.sql'), { encoding: "UTF-8" }).split(";");
      for (let query of queries) {
        query = query.trim();
        if (query.length !== 0 && !query.match(/\/\*/)) {
          this.connection.query(query, function (err, sets, fields) {
            if (err) {
              console.log(`Importing failed for Mysql Database  - Query:${query}`);
              console.log(err)
            } else {
              console.log(`Importing Mysql Database`);
            }
          });
        }
      }
    } else if (data == 'connected') {
      console.log('Conectado ao Database!');
    }
  }

  // Se certifica de que o BD é 'gerencia_pagamentos', e
  // chama pela função createDBFromSQLFile
  setCurrentDB(callback) {
    this.connection.query(`USE gerencia_pagamentos`, function (err, rows) {
      if (err) {
        if (err.errno == 1049) {
          console.log(`${err.sqlMessage} : Failed to connect MySql database`);
          return callback('refused');
        } else {
          console.log(`Mysql Database connection error`);
          return callback('refused');
        }
      } else {
        return callback('connected');
      }
    });
  }

  createClient() {
    const sql = 'CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Client` (`idClient` INT NOT NULL AUTO_INCREMENT,`cpf` VARCHAR(11) NULL,`name` VARCHAR(45) NULL,`phone` VARCHAR(14) NULL,`email` VARCHAR(45) NULL,`bankAccount` VARCHAR(45) NULL,PRIMARY KEY (`idClient`))ENGINE = InnoDB;'

    this.connection.query(sql, (erro) => {
      if(erro)
        console.log(erro)
      else
        console.log("Tabela `Client` criada com sucesso!")
    })
  }

  createCondo() {
    const sql = "CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Condo` (`idCondo` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(45) NULL,PRIMARY KEY (`idCondo`))ENGINE = InnoDB;"
    this.connection.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Tabela `Condo` criada com sucesso!")
      }
    })
  }

  createDebt() {
    const sql = "CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Debt` (`idDebt` INT NOT NULL AUTO_INCREMENT,`totalValue` DECIMAL NULL,`totalInstallments` INT NULL,`readjustmentInstallment` INT NULL,`currentInstallment` INT NULL,PRIMARY KEY (`idDebt`))ENGINE = InnoDB;"

    this.connection.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Tabela `Debt` criada com sucesso!")
      }
    })
  }

  createLand() {
    const sql = "CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Land` (`idLand` INT NOT NULL AUTO_INCREMENT,`codeName` VARCHAR(45) NULL,`soldDate` DATE NULL,`builtDate` DATE NULL,`idDebt` INT NULL,`idClient` INT NULL,`idCondo` INT NULL,PRIMARY KEY (`idLand`),INDEX `fk_Land_Debt1_idx` (`idDebt` ASC) VISIBLE,INDEX `fk_Land_Client1_idx` (`idClient` ASC) VISIBLE,INDEX `fk_Land_Condo1_idx` (`idCondo` ASC) VISIBLE,CONSTRAINT `fk_Land_Debt1`  FOREIGN KEY (`idDebt`)  REFERENCES `gerencia_pagamentos`.`Debt` (`idDebt`)  ON DELETE NO ACTION  ON UPDATE NO ACTION,CONSTRAINT `fk_Land_Client1`  FOREIGN KEY (`idClient`)  REFERENCES `gerencia_pagamentos`.`Client` (`idClient`)  ON DELETE NO ACTION  ON UPDATE NO ACTION,CONSTRAINT `fk_Land_Condo1`  FOREIGN KEY (`idCondo`)  REFERENCES `gerencia_pagamentos`.`Condo` (`idCondo`)  ON DELETE NO ACTION  ON UPDATE NO ACTION)ENGINE = InnoDB;"

    this.connection.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Tabela `Land` criada com sucesso!")
      }
    })
  }

  createInstallment() {
    const sql = "CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Installment` (`orderCode` INT NOT NULL,`paymentDate` DATE NULL,`expiringDate` DATE NULL,`rawPrice` DECIMAL NULL,`waterPrice` DECIMAL NULL,`energyPrice` VARCHAR(45) NULL,`isPaid` TINYINT NULL,`idDebt` INT NOT NULL,PRIMARY KEY (`orderCode`, `idDebt`),INDEX `fk_Installment_Debt1_idx` (`idDebt` ASC) VISIBLE,CONSTRAINT `fk_Installment_Debt1`  FOREIGN KEY (`idDebt`)  REFERENCES `gerencia_pagamentos`.`Debt` (`idDebt`)  ON DELETE NO ACTION  ON UPDATE NO ACTION)ENGINE = InnoDB;"

    this.connection.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Tabela `Installment` criada com sucesso!")
      }
    })
  }


  /*
  databaseFinalTouch() {
    const sql = "SET SQL_MODE=@OLD_SQL_MODE;SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;"

    this.connection.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Database criado por completo!")
      }
    })
  }

  createDatabase() {
    const sql = "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0; SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE ='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';"
    const createSchema = sql + 'CREATE SCHEMA IF NOT EXISTS `gerencia_pagamentos` DEFAULT CHARACTER SET utf8 ; USE `gerencia_pagamentos` ;'


    this.connection.query(createSchema, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Erro ao criar Schema!")
      }
    })
  }*/

}

module.exports = new Tables
