var mysql = require("mysql");
var inquirer = require('inquirer');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon",
    insecureAuth: true
});
// Connec to DB
connection.connect();
//Show everything from the products table
connection.query(`SELECT * FROM products`, function (error, results) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
        console.log(`Item Id: ${results[i].item_id} || Product Name: ${results[i].product_name} || Department: ${results[i].department_name} || Price: $${results[i].price} || Quantity: ${results[i].stock_quantity} || Product Sales: $${results[i].product_sales}
        `);
    }
    // run the user prompt
    promptUserPurchase();
});

function promptUserPurchase() {
    // Prompt the user to select an item
    inquirer.prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase',
            //validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you want?',
            //validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        let itemID = input.item_id;
        let quantity = input.quantity;
        //show the rows with the id of the user's input
        connection.query('SELECT * FROM `products` WHERE `item_id` = ?', [itemID], function (error, results, fields) {
            if (error) throw error;
            //show that there isn't enough if the user asks for more than in stock
            if (quantity > results[0].stock_quantity) {
                console.log(`Insufficient Quantity!`);
                connection.end();
            } else {
                let newQuantity = results[0].stock_quantity - quantity;
                let totalCost = quantity * results[0].price
                //update products to subtract number the user needs from the total quantity
                connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemID}`, function (error, results, fields) {
                    if (error) throw error;
                });
                //update product sales to show how much the user spent
                connection.query(`UPDATE products SET product_sales = ${totalCost} WHERE item_id = ${itemID}`, function (error, results, fields) {
                    if (error) throw error;
                    //show user their transaction
                    console.log(`Your total today is: $${totalCost}`);
                    promptUserPurchase();
                    connection.end();
                });
            }
        });

    });
}
