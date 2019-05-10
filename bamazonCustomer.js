var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon",
    insecureAuth: true
});

connection.connect();

connection.query(`SELECT * FROM products`, function (error, results) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
        console.log(`Item Id: ${results[i].item_id} || Product Name: ${results[i].product_name} || Department: ${results[i].department_name} || Price: $${results[i].price} || Quantity: ${results[i].stock_quantity}
        `);
    }
    promptUserPurchase();
});

function promptUserPurchase() {
    // Prompt the user to select an item
    inquirer.prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            //validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            //validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        //console.log(input.quantity);
        let itemID = input.item_id;
        let quantity = input.quantity;
        connection.query('SELECT * FROM `products` WHERE `item_id` = ?', [itemID], function (error, results, fields) {
            if (error) throw error;
            if (quantity > results[0].stock_quantity) {
                console.log(`Insufficient Quantity!`);
                connection.end();
            } else {
                let newQuantity = results[0].stock_quantity - quantity;
                let totalCost = quantity*results[0].price
                connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemID}`, function (error, results, fields) {
                    if (error) throw error;
                    console.log(`Your total today is: $${totalCost}`);
                    connection.end();
                });
            }
        });

    });
}
