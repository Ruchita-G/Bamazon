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
        console.log("\nBrowse our Product product!\n")
        productChoices();
        productproduct();
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

function productproduct() {

  inquirer.prompt(
    {
      "name": "id",
      "message": "Please enter a Product ID to make a purchase!",
      "type": "input",
      "validate": function (input) {

        if (Number.isInteger(parseInt(input)) === true) {
          return true
        }
        else {
          console.log("\nEnter a valid ID number to continue.")
        }
      }
    }).then(function (answer) {

      var selection = answer.id

      connection.query("SELECT * FROM products WHERE itemId=?", selection, function (err, res) {
        if (err) throw err;
        if (res.length === 0) {

          console.log("Please enter a valid Product Id from the table");
          productChoices();

        } else {

          inquirer.prompt(
            {
              "name": "quantity",
              "message": "Please enter the number of quantity to be purchased!",
              "type": "input",
              "validate": function (input) {

                if (Number.isInteger(parseInt(input)) === true) {
                  return true
                }
                else {
                  console.log("\nEnter a number.")
                }
              }
            }).then(function (answer) {
              var quantity = answer.quantity;

              if (quantity > res[0].stockQuantity) {

                console.log("\nApologies!! Cannot complete order due to Insufficient Stock!")
                productChoices();

              } else {

                console.log("\nOrder Complete for " + res[0].productName + " " + quantity + " qty @ $" + res[0].price);

                var newQuantity = res[0].stockQuantity - quantity;
                connection.query("UPDATE products SET stockQuantity = " + newQuantity + "WHERE itemId = " + res[0].itemId, function (err, res) {

                  console.log("\nThank you for chosing Bamazon!")

                  startOptions();
                }
                )
              }
            })
        }
      })
    })
}
