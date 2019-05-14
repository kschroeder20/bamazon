// Pull in required dependencies
let inquirer = require('inquirer');
let mysql = require('mysql');
require('dotenv').config();
let departmentArr = [];
let uniqueDepartmentArr = [];


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
function promptSupervisorAction() {
    // Prompt the manager to select an option
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'Please select an option:',
        choices: ['View Product Sales by Department', 'Create New Department'],
    }]).then(function (input) {
        //Show product sales by department
        if (input.option === 'View Product Sales by Department') {
            connection.query(`SELECT departments.department_id, departments.department_name, departments.over_head_cost, products.product_sales
            FROM departments
            INNER JOIN products
            ON departments.department_name = products.department_name
            ORDER BY department_id`,
                function (err, results) {
                    if (err) throw err;
                    for (let i = 0; i < results.length; i++) {
                        let totalProfit = results[i].product_sales - results[i].over_head_cost;
                        console.log(`Department Id: ${results[i].department_id} || Department Name: ${results[i].department_name} || Over Head Cost: $${results[i].over_head_cost} || Product Sales: $${results[i].product_sales} || Total Profit: $${totalProfit}
                            `);
                    }
                    promptSupervisorAction();
                });
        } // add new department to department table
        else if (input.option === 'Create New Department') {
            inquirer.prompt([{
                    type: 'input',
                    name: 'department_name',
                    message: `What is the new department's name?`,
                },
                {
                    type: 'input',
                    name: 'over_head_cost',
                    message: 'What is the overhead cost for this department?',
                    filter: Number
                }
            ]).then(function (input) {
                //add new department based on user input
                connection.query(`INSERT INTO departments (department_name, over_head_cost)
                VALUES('${input.department_name}', ${input.over_head_cost})`, function (error, results, fields) {
                    if (error) throw error;
                    console.log(`You have added the ${input.department_name} department at an over head cost of $${input.over_head_cost}`);
                        promptSupervisorAction();
                });
            });
        }
    });
}







// connection.query(`DELETE FROM departments`, function (error, results) {
//     if (error) throw error;
// });
// console.log(input.option);
// if (input.option === 'View Product Sales by Department') {
//     connection.query(`INSERT bamazon.departments(department_name) SELECT DISTINCT department_name FROM products`, function (error, results) {
//         if (error) throw error;
//     });


//     connection.query(`SELECT * FROM products`, function (error, results) {
//         if (error) throw error;
//         //console.log(results[0].department_name);
//         for (let i = 0; i < results.length; i++) {
//             departmentArr.push(results[i].department_name);
//         }
//         uniqueDepartmentArr = departmentArr.filter(function (item, index) {
//             return departmentArr.indexOf(item) >= index;
//         });

//         //console.log(departmentArr);
//         console.log(uniqueDepartmentArr);

//         for (let i = 0; i < uniqueDepartmentArr.length; i++){
//             connection.query(`INSERT INTO departments (department_name) VALUES ('${uniqueDepartmentArr[i]}')`, function (error, results) {
//             if (error) throw error;
//             });
//         }
//     });



//     //connection.end();
// }

//     });
// }

promptSupervisorAction();