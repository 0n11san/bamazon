-- JIC
DROP DATABASE IF EXISTS Bamazon;
-- Creates 'Bamazon' DB
CREATE DATABASE Bamazon;

-- All subsequent code will affect the 'Bamazon' DB created above
USE Bamazon;
-- "products" table --
CREATE TABLE products(
  -- unique id for each product
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- name of product
  product_name VARCHAR(50) NOT NULL,
  -- department name
  department_name VARCHAR(50) NOT NULL,
  -- cost to customer
  price INTEGER(10),
  -- how much product is available in stores, starting at 0 to insert value
  stock_quantity INTEGER(10) DEFAULT 0,
  -- Sets primary key of 'products' table to 'item_id' (i.e. all the products listed should order themselves by this column)
  PRIMARY KEY (item_id)
);

-- Create new rows containing data in all named columns, inserting 10 items--
-- Video game console
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Playstation 4", "Electronics", 300, 200);
-- Book
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Eloquent JavaScript", "Books", 40, 1000);
-- Antiques
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Katana", "Antiques", 7000, 1);
-- Macbook Pro
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Macbook Pro", "Electronics", 3000, 100);
-- Bed sheets
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "8000-thread count bed sheets", "Bedding", 300, 40);
-- Toaster Oven
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Cusine Art Toaster Oven", "Kitchen", 150, 300);
-- Collectable
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Signed Michael Jackson 'Off the Wall' Album", "Music", 300, 5);
-- Jacket
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Red Member's Only Jacket", "Clothing", 40, 100);
-- Vaccuum
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Dyson", "Tools", 250, 500);
-- Fitness Equipment
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Yoga Mat", "Fitness Equipment", 15, 700);

-- Select all columns from all rows. --
SELECT * FROM products
