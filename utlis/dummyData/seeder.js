
/*  seeder => file to insert or delete data to database automatic  */

const fs = require('fs'); // core module build in node not install
const mongoose = require('mongoose');

require('colors'); // use in terminal 

const dotenv = require('dotenv').config({ path: '../../config.env'});

const Product = require("../../model/productModel");


// connect to DB
mongoose.connect( process.env.DB_URL ).then((data)=>{
  console.log(`seeder ${data.connection.host}`);
}).catch((error)=> console.log(`xx ${error}`));


// Read data
const products = JSON.parse(fs.readFileSync('./products.json')); // read dummyData from products.json  


// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {   // node seeder.js -i   0  1  2   => to run seeder.js
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}