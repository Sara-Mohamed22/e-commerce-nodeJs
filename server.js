const express =require('express');
// eslint-disable-next-line node/no-unpublished-require
const dotenv = require('dotenv').config({ path: 'config.env'});
// const dotenv = require('dotenv').config(); //.env

const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// eslint-disable-next-line import/extensions
const categoryRoute = require('./router/category');
const subCategoryRoute = require('./router/subCategory');
const brandRoute = require('./router/brandRoute');
const productRoute = require('./router/prouduct');




const ApiError = require('./utlis/apiError');
const globalError = require('./middleware/errorMidleware');

const app = express();

// app.use(express.json())

console.log(`mode : ${process.env.NODE_ENV}` );

if( process.env.NODE_ENV === 'development' )
{
      app.use(morgan('dev'));
      console.log(`mode : ${process.env.NODE_ENV}` );
}


app.use(bodyParser.urlencoded({extends : false })); 
app.use(bodyParser.json());





app.use('/api/v1/categories', categoryRoute );
app.use('/api/v1/subCategories', subCategoryRoute );
app.use('/api/v1/categories/:categoryId/subCategories', subCategoryRoute );
app.use('/api/v1/brands', brandRoute );
app.use('/api/v1/products', productRoute );






app.all('*', (req,res,next)=>{ 

  next(new ApiError( `can't find this route ${req.originalUrl}` , 400 ));


});


app.use(globalError);


const  serv =  app.listen( process.env.PORT || 3000  , (req,res)=> 
{ console.log('listen to server...')});

mongoose.connect( process.env.DB_URL ).then((data)=> {

    console.log(`connect to ${data.connection.host}`); 
});





process.on('unhandledRejection' , (error)=>{

  // console.error(`UnhandledRejection error :  ${error.name} | ${error.message } `);
  /* serv.close(()=>{

  console.log('server shut down ');

  // close server to close requests then close app 
  process.exit(); // to exit from application or close mode application

});*/


});























