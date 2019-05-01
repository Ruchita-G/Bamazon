DROP DATABASE IF EXIStS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE productS (
  itemId INTEGER AUTO_INCREMENT NOT NULL,
  productName VARCHAR(45)NOT NULL,
  departmentName VARCHAR(45)NOT NULL,
  price DECIMAL(10,2) NULL,
  stockQuantity INT NULL,
  productSales INTEGER(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (itemId)
);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Iphone", "electronics", 1000, 100);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Surface", "electronics", 1200, 120);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Fit-Bit", "electronics", 250, 75);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Vitamix", "Kitchen", 500, 90);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Keurig", "Kitchen", 200, 110);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Air-Fryer", "Kitchen", 150, 105);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("HatS", "Accesories", 25, 130);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("BeltS", "Accesories", 20, 90);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("WalletS", "Accesories", 50, 175);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("PantS", "Apparel", 500, 90);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Shirt", "Apparel", 200, 110);

INSERT INTO productS (productName, departmentName, price, stockQuantity)
VALUES ("Sweater", "Apparel", 150, 105);