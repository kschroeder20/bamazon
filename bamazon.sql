DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (45) NULL,
    department_name VARCHAR
    (45) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY
    (item_id)
);

    ALTER TABLE products
ADD product_sales INT NULL;


    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Dove Conditioner', 'Cosmetics', 6.25, 627),
        ('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 300),
        ('Brawny Paper Towels', 'Grocery', 4.25, 400),
        ('Granny Smith Apples', 'Produce', 0.35, 800),
        ('Chiquita Bannana', 'Produce', 0.20, 10000),
        ('Tropicana Orange Juice', 'Grocery', 4.45, 267),
        ('Horizon Organic Milk', 'Grocery', 4.50, 200),
        ('Huggies Diapers', 'Children', 2.75, 476),
        ('Charmin Toiler Paper', 'Grocery', 12.99, 575),
        ('Pampers Baby Wipes', 'Children', 1.50, 423),
        ('Yoga Mat', 'Sports', 12.75, 150),
        ('5lb Dumb bell', 'Sports', 7.99, 89),
        ('Tie Dye Shirt', 'Clothing', 5.55, 120),
        ('Nike Shorts', 'Clothing', 17.88, 250),
        ('Purina Cat Chow', 'Pet', 7.25, 157),
        ('Fancy Feast Wet Cat Food', 'Pet', 12.50, 163),
        ('Ibuprophen', 'Pharmacy', 4.95, 4),
        ('Band Aid', 'Pharmacy', 3.25, 550),
        ('Ben & Jerry Ice Cream', 'Grocery', 3.25, 432);


    USE bamazon;
    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
    department_name VARCHAR
        (45) NULL,
    over_head_cost INT NULL,
    PRIMARY KEY
        (department_id)
);

        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES
            ('Cosmetics', 100),
            ('Grocery', 200),
            ('Produce', 300),
            ('Children', 400),
            ('Clothing', 500),
            ('Pet', 600),
            ('Pharmacy', 700);

