var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "bamazon_db"
});

connection.connect(function (err, ) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startOptions();
});

function startOptions() {
  inquirer.prompt([
    {
      "name": "options",
      "message": "\nWelcome to Bamazon! \nPlease select an option!",
      "type": "list",
      "choices": ["Checkout Bamazon", "Quit Bamazon"]
    }
  ]).then(function (answer) {
    switch (answer.options) {
      case "Checkout Bamazon":
        productChoices();
        console.log("\nBrowse our Product Selection!\n")
        productSelection();
        break;
      case "Quit Bamazon":
        console.log("\nVisit us again later!\n")
        connection.end()
        break;
    }
  })
}

function productChoices() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    table = new Table({
      head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],

    })
    res.forEach(function (res) {
      table.push([res.itemId, res.productName, res.departmentName, "$" + res.price, res.stockQuantity])

    })
    console.log("\n" + table.toString())
  })
}

function productSelection() {
  
  inquirer.prompt(
    {
      "name": "id",
      "message": "\nPlease type the item id for the product you want to select to buy.\n",
      "type": "input",
      "validate": function (input) {
        if (Number.isInteger(parseInt(input)) === true) {
          return true
        }
        else {
          console.log("\nPlease enter a number.")
        }
      }

    }).then(function (selection) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].itemId === selection.id) {
          selectedItem = res[i];
          console.log(res[i]);
        }
      }
      inquirer.prompt(
        {
          "name": "quantity",
          "message": "\nHow many would you like to buy?\n",
          "type": "input",
          "validate": function (input) {
            if (Number.isInteger(parseInt(input)) === true) {
              return true
            }
            else {
              console.log("\nPlease enter a number.")
            }
          }
        }).then(function (selection) {
          if ((res.stockQuantity - selection.quantity) >= 0) {
            buyProduct()
          }
          else {
            console.log("Sorry canot fulfill order insufficient stock! You requested ") //+ quantity.stockQuantity + " of this item, but we only have " + res.stockQuantity + " in stock. Please make your selection from the product list.")
            productChoices();
          }
        })
    })
}

function buyProduct(item, quantity) {
        
      }