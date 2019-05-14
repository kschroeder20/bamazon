# Bamazon

## Getting Started

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
    * Customer - 'node bamazonCustomer.js'
    * Manager - 'node bamazonManager.js'
    * Exective - ''node bamazonExecutive.js''
- Run 'ctrl + c' to exit each mode

### What Each JavaScript Does

1. `BamazonCustomer.js`

    * Prints the products in the store.

    * Prompts customer which product they would like to purchase by ID number.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.
      * It will also update the product sales in the department table.

-----------------------

2. `BamazonManager.js`

    * Starts with a menu:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its stock_qunatity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

-----------------------

3. `BamazonExecutive.js`

    * Starts with a menu:
        * View Product Sales by Department
        * Create New Department

    * If the manager selects `View Product Sales by Department`, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.

    * If the manager selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales

## Demo Videos

* BamazonCustomer.js (https://drive.google.com/open?id=1mNpbqP4H-ELhumcDHQ9uLidb6heAqQ7V)

* BamazonManager.js (https://drive.google.com/open?id=1SyUA1WyBmOqBks8qkpbpgvAFPMy6q31g)

* ExecutiveManager.js (https://drive.google.com/open?id=1kjqV9omZRjnZCJr10F4UHNNzJ_lpfqSe)

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference schema.sql
``
