CREATE SCHEMA IF NOT EXISTS `gerencia_pagamentos` DEFAULT CHARACTER SET utf8 ;
USE `gerencia_pagamentos` ;

CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Client` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(11) NULL,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(14) NULL,
  `email` VARCHAR(45) NULL,
  `bankAccount` VARCHAR(45) NULL,
  `creationDate` DATETIME NULL,
  `lastModifiedDate` DATETIME NULL,
  PRIMARY KEY (`idClient`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Condo` (
  `idCondo` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `creationDate` DATETIME NULL,
  `lastModifiedDate` DATETIME NULL,
  PRIMARY KEY (`idCondo`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Debt` (
  `idDebt` INT NOT NULL AUTO_INCREMENT,
  `totalValue` DECIMAL NULL,
  `totalInstallments` INT NULL,
  `readjustmentInstallment` INT NULL,
  `currentInstallment` INT NULL,
  `creationDate` DATETIME NULL,
  `lastModifiedDate` DATETIME NULL,
  PRIMARY KEY (`idDebt`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Land` (
  `idLand` INT NOT NULL AUTO_INCREMENT,
  `codeName` VARCHAR(45) NULL,
  `soldDate` DATE NULL,
  `builtDate` DATE NULL,
  `idDebt` INT NULL,
  `idClient` INT NULL,
  `idCondo` INT NULL,
  `creationDate` DATETIME NULL,
  `lastModifiedDate` DATETIME NULL,
  PRIMARY KEY (`idLand`),
  INDEX `fk_Land_Debt1_idx` (`idDebt` ASC) VISIBLE,
  INDEX `fk_Land_Client1_idx` (`idClient` ASC) VISIBLE,
  INDEX `fk_Land_Condo1_idx` (`idCondo` ASC) VISIBLE,
  CONSTRAINT `fk_Land_Debt1`
    FOREIGN KEY (`idDebt`)
    REFERENCES `gerencia_pagamentos`.`Debt` (`idDebt`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Land_Client1`
    FOREIGN KEY (`idClient`)
    REFERENCES `gerencia_pagamentos`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Land_Condo1`
    FOREIGN KEY (`idCondo`)
    REFERENCES `gerencia_pagamentos`.`Condo` (`idCondo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `gerencia_pagamentos`.`Installment` (
  `idDebt` INT NOT NULL,
  `orderCode` INT NOT NULL,
  `paymentDate` DATE NULL,
  `expiringDate` DATE NULL,
  `rawPrice` DECIMAL NULL,
  `waterPrice` DECIMAL NULL,
  `energyPrice` VARCHAR(45) NULL,
  `isPaid` TINYINT NULL,
  `creationDate` DATETIME NULL,
  `lastModifiedDate` DATETIME NULL,
  PRIMARY KEY (`idDebt`, `orderCode`),
  INDEX `fk_Installment_Debt1_idx` (`idDebt` ASC) VISIBLE,
  CONSTRAINT `fk_Installment_Debt1`
    FOREIGN KEY (`idDebt`)
    REFERENCES `gerencia_pagamentos`.`Debt` (`idDebt`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;