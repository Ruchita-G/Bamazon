var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table')

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
    menu();
});

function menu() {
    console.log("----------------------------------------------------------------------------");
    inquirer.prompt(
        {
            "name": "manage",
            "message": "\nPlease select an option to manage Bamazon.",
            "type": "list",
            "choices": ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }).then(function (answer) {
            switch (answer.manage) {
                case "View Products for Sale":
                    productTable();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    console.log("Exiting program.")
                    connection.end();
                    break;
            }
        })
}

function productTable() {
    console.log("-------------------------------------------------------------------");
    console.log("Complete list of Bamazon products in stock");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],

        })
        res.forEach(function (res) {
            table.push([res.itemId, res.productName, res.departmentName, "$" + res.price, res.stockQuantity])

        })
        console.log("\n" + table.toString())
        console.log(" ");
        menu();
    })
}

function lowInventory() {
    console.log("-------------------------------------------------------------------");
    console.log("Bamazon products in low in stock");

    connection.query("SELECT * FROM products WHERE stockQuantity < 25", function (err, res) {
        if (err) throw err;
        table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],

        })
        res.forEach(function (res) {
            table.push([res.itemId, res.productName, res.departmentName, "$" + res.price, res.stockQuantity])

        })
        console.log(" ");
        console.log("\n" + table.toString())
        console.log(" ");
        menu();
    })

}

function addToInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],

        })
        res.forEach(function (res) {
            table.push([res.itemId, res.productName, res.departmentName, "$" + res.price, res.stockQuantity])

        })
        console.log("\n" + table.toString())
        console.log(" ");

        inquirer.prompt([
            {
                "name": "id",
                "message": "Please enter Product Id to add inventory: ",
                "type": "input",
                "validate": function (input) {

                    if (Number.isInteger(parseInt(input)) === true) {
                        return true
                    }
                    else {
                        console.log("\nEnter a valid ID number to continue.")
                    }
                }
            },
            {
                "name": "quantity",
                "message": "Please enter the quantity of inventory added: ",
                "type": "input",
                "validate": function (input) {

                    if (Number.isInteger(parseInt(input)) === true) {
                        return true
                    }
                    else {
                        console.log("\nEnter a number to continue.")
                    }
                }
            }
        ]).then(function (answer) {
            var i = answer.id-1;
            var quantity = answer.quantity;
            console.log(" ");
            console.log("-------------------------------------------------------------------");
            console.log("Updating Inventory:\n" + "\nProduct Name: " + res[i].productName + " Adding inventory: " + quantity);
            var newQuantity = (parseFloat(res[i].stockQuantity) + parseFloat(quantity));

            connection.query("UPDATE products SET stockQuantity = " + newQuantity + " WHERE itemId = " + res[i].itemId, function (err, res) {

                console.log("\nInventory Updated " + newQuantity);
                console.log("-------------------------------------------------------------------");

                productTable();
            })
        })
    })
}

function addNewProduct() {

    inquirer.prompt([
        {
            "name": "product",
            "message": "\nPlease enter the name of the new product: ",
            "type": "input"
        },
        {
            "name": "department",
            "message": "\nPlease enter department name for the product: ",
            "type": "input",
        },
        {
            "name": "price",
            "message": "\nPlease enter price of the product: ",
            "type": "input",
            "validate": function (input) {

                if (Number.isInteger(parseInt(input)) === true) {
                    return true
                }
                else {
                    console.log("\nEnter a number to continue.")
                }
            }
        },
        {
            "name": "quantity",
            "message": "\nPlease enter the quantity of product added to stock: ",
            "type": "input",
            "validate": function (input) {

                if (Number.isInteger(parseInt(input)) === true) {
                    return true
                }
                else {
                    console.log("\nEnter a number to continue.")
                }
            }
        }
    ]).then(function (answer) {

        connection.query("INSERT INTO products SET ?", {
            productName: answer.product,
            departmentName: answer.department,
            price: answer.price,
            stockQuantity: answer.quantity
        }, function (err, res) {
            if (err) throw err;
            console.log("-------------------------------------------------------------------");
            console.log("\nNew product added" + "\nProduct Name: " + answer.product + "\nDepartment: " + answer.department + "\nPrice: " + answer.price + "\nQuantity: " + answer.quantity + "\n")
            productTable();
        })
    })
}

