// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
require('dotenv').config();

// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,

    // Your username
    user: process.env.DB_USER,

    // Your password
    password: process.env.DB_PASS,
    database: 'bamazon'
});

// promptManagerAction will present menu options to the manager and trigger appropriate logic
function promptManagerAction() {
    // Prompt the manager to select an option
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'Please select an option:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    }]).then(function (input) {
        if (input.option === 'View Products for Sale') {
            //show all of the products
            connection.query(`SELECT * FROM products`, function (error, results) {
                if (error) throw error;
                for (let i = 0; i < results.length; i++) {
                    console.log(`Item Id: ${results[i].item_id} || Product Name: ${results[i].product_name} || Department: ${results[i].department_name} || Price: $${results[i].price} || Quantity: ${results[i].stock_quantity}
                    `);
                }
            });
            promptManagerAction();
        }// show the items with stock_qunaity < 5
        else if (input.option === 'View Low Inventory') {
            connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (error, results) {
                if (error) throw error;
                for (let i = 0; i < results.length; i++) {
                    console.log(`Item Id: ${results[i].item_id} || Product Name: ${results[i].product_name} || Department: ${results[i].department_name} || Price: $${results[i].price} || Quantity: ${results[i].stock_quantity} || Product Sales: ${results[i].product_sales}
        `);
                }
            });
            //connection.end();
            promptManagerAction();
         } //prompt the user how much they want to add and of what item
        else if (input.option === 'Add to Inventory') {
            inquirer.prompt([{
                    type: 'input',
                    name: 'item_id',
                    message: 'Please enter the Item ID which you would like to add more of',
                    //validate: validateInput,
                    filter: Number
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'How many do want to add?',
                    //validate: validateInput,
                    filter: Number
                }
            ]).then(function (input) {
                //don't let user give negative number
                if (input.quantity < 0) {
                    console.log(`You must add a possitive number`);
                    promptManagerAction();
                }//Add the desired quanity to the total stock of the desired product
                else {
                    let itemID = input.item_id;
                    let quantity = input.quantity;
                    connection.query('SELECT * FROM `products` WHERE `item_id` = ?', [itemID], function (error, results, fields) {
                        if (error) throw error;
                        let oldQuantity = results[0].stock_quantity
                        let newQuantity = oldQuantity + quantity;
                        let product = results[0].product_name;
                        connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${itemID}`, function (error, results, fields) {
                            if (error) throw error;
                            console.log(`You have updated ${product} from ${oldQuantity} to ${newQuantity}`);
                            //connection.end();
                            promptManagerAction();
                        });
                    });
                }
            });
        }//Prompt the user on which new product, which department it should be in, what the price is, and how many units
        else if (input.option === 'Add New Product') {
            inquirer.prompt([{
                type: 'input',
                name: 'product_name',
                message: 'Name of the new product',
            },
            {
                type: 'input',
                name: 'department_name',
                message: 'Department the new product should be in',
            },
            {
                type: 'input',
                name: 'price',
                message: 'Price per unit',
                filter: Number
            },
            {
                type: 'input',
                name: 'stock_quantity',
                message: 'Quantity of units',
                filter: Number
            }
            ]).then(function (input) {
                //insert input into the db
                connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)
                VALUES('${input.product_name}', '${input.department_name}', ${input.price}, ${input.stock_quantity})`, function (error, results, fields) {
                    if (error) throw error;
                    console.log(`You have added ${input.product_name} to the ${input.department_name} department at the price of $${input.price} per unit and a quanity of ${input.stock_quantity}`);
                    promptManagerAction();
                });
            });
        }
    });
}

promptManagerAction();