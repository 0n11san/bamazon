//NPM packages dependancies
// mysql and inquirer npm packages
var mySql = require("mysql");
var inquirer = require("inquirer");

// Connects NodeJS app to MySQL database.
var connection = mySql.createConnection({
  host: "localhost",
  //tried hosting this w/ Heroku (unsccessfully), will try again later...
  //only port 3306 seems to work w/ mySQL, maybe that's the default?
  //this link says i would need to change CNF file to change port: https://stackoverflow.com/questions/29866204/how-to-change-the-default-port-of-mysql-from-3306-to-3360/29866252#29866252
  port: process.env.PORT || 3306,

  // user name
  user:"root",

  // password + Bamazon database name
  password:"",
  database: "Bamazon"
});

// Displays Bamazon inventory data from MySQL to user, then invokes the selectProduct ID function
var start = function(){
  //Shows the inserted table values from MySQL workbench in the CLI:
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Welcome to Bamazon!");
    console.log("You can purchase any of the products below:");
    console.log("----------------------------------------------------");
    console.log("ID | Product | Department Name | Price ($) | Stock");
    console.log("----------------------------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("----------------------------------------------------");
    selectProductId();
  });
}

// Asks user which Product (ID) they would like to purchase, via Inquirer
var selectProductId = function(){
  connection.query("SELECT * FROM products", function(err, res) {
    inquirer.prompt({
      name:"productId",
      type:"userInput",
      message:"Which product would like to purchase? (enter corresponding product ID number)"
    }).then(function(answer){
        if(answer.productId >= 1 && answer.productId <=10){
          // stores the user's answer in 'idnumber'
          var idnumber = answer.productId;
          // Invokes the stockProduct function with stored user value
          stockProduct(idnumber);
        // Else, if user DOESN'T input a valid value...
      }
      else {
          // Show response indicating invalidity of statement
          console.log("Invalid. Please input a number from 1 up to 10.")
          // Restarts 'selectProductId' function until customer inputs a valid number.
          selectProductId();
      }
    })
  })
}

// Asks user how many units of the previously specified product they would like to buy
var stockProduct = function(idnumber) {
  // setting stored value into index value of stock array
  var stockIndex = idnumber;

  console.log("Selected Product ID: " + stockIndex);
  // console.log('working');
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    inquirer.prompt({
      name:"stock",
      type:"userInput",
      message:"How many would you like to buy?"
    }).then(function(answer){

      // if number of desired units is less than the quantity of the selected stock quantity...
      if (answer.stock === 0){

        console.log("You have to purchase more than 0. Returning to store front...                                                                                                                                                          ");

        setTimeout(function(){
          start();
        }, 3000);


      }

      else if (answer.stock < res[stockIndex - 1].stock_quantity){

        var updatedStock = res[stockIndex - 1].stock_quantity - answer.stock;
        console.log("OK, we have that many. Here you go!");

        // Updates stocks for that item in MySQL DB
        connection.query("UPDATE products SET ? WHERE ?",
          [{stock_quantity: updatedStock},
          {item_id: stockIndex}]);

        // Then shows the updated stock for that item in the console.
        console.log("Remaining Stock: " + updatedStock);
        // As well as the total cost for their purchase.
        console.log("Total Cost of Purchase: " + (res[stockIndex - 1].price) * answer.stock);
        console.log("Cost: " + (res[stockIndex - 1].price) * answer.stock);

        //add option to ask whether you'd like to start over or not
        //borrowed this snippet from hangman hw
          inquirer.prompt([{
              name: "continue",
              type: "confirm",
              message: "Keep shopping?"
            }]).then(function(answer) {
              if (answer.continue) {
                start();
              } else {
                console.log("Come again soon!");
              }
            })
          // },
      }

      else {
        console.log("We don't have that many to sell :-(  Sorry!");
        //start application again (does this break anything?)
        inquirer.prompt([{
            name: "continue",
            type: "confirm",
            message: "Keep shopping?"
          }]).then(function(answer) {
            if (answer.continue) {
              start();
            } else {
              console.log("Come again soon!");
            }})


      }
    })
  })
}
// Begins the app
start();
