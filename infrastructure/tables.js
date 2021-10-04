class Tables {
  init(connection) {
    this.connection = connection

    this.createClient()
    this.createCondo()
    this.createDebt()
    this.createLand()
    this.createInstallment()
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
    const sql = "CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Land` (`idLand` INT NOT NULL AUTO_INCREMENT,`codeName` VARCHAR(45) NULL,`soldDate` DATE NULL,`builtDate` DATE NULL,`idDebt` INT NOT NULL,`idClient` INT NOT NULL,`idCondo` INT NOT NULL,PRIMARY KEY (`idLand`, `idDebt`, `idClient`, `idCondo`),INDEX `fk_Land_Debt1_idx` (`idDebt` ASC) VISIBLE,INDEX `fk_Land_Client1_idx` (`idClient` ASC) VISIBLE,INDEX `fk_Land_Condo1_idx` (`idCondo` ASC) VISIBLE,CONSTRAINT `fk_Land_Debt1`  FOREIGN KEY (`idDebt`)  REFERENCES `gerencia_pagamentos`.`Debt` (`idDebt`)  ON DELETE NO ACTION  ON UPDATE NO ACTION,CONSTRAINT `fk_Land_Client1`  FOREIGN KEY (`idClient`)  REFERENCES `gerencia_pagamentos`.`Client` (`idClient`)  ON DELETE NO ACTION  ON UPDATE NO ACTION,CONSTRAINT `fk_Land_Condo1`  FOREIGN KEY (`idCondo`)  REFERENCES `gerencia_pagamentos`.`Condo` (`idCondo`)  ON DELETE NO ACTION  ON UPDATE NO ACTION)ENGINE = InnoDB;"

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
