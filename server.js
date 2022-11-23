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


app.use(bodyParser.urlencoded({extends : false })); // to send data from www-data-form
app.use(bodyParser.json());

// app.use(formData());



app.use('/api/v1/categories', categoryRoute );
app.use('/api/v1/subCategories', subCategoryRoute );
app.use('/api/v1/categories/:categoryId/subCategories', subCategoryRoute );
app.use('/api/v1/brands', brandRoute );
app.use('/api/v1/products', productRoute );




//عشان لو بعمل روت علي url مش موجود 

app.all('*', (req,res,next)=>{ 

 /* //create error and send it to error handle midleware .
  const e = new Error(`can't find this route ${req.originalUrl}`); 
  next(e.message);  // send error to error handle middleware .  */

  /// general error

  next(new ApiError( `can't find this route ${req.originalUrl}` , 400 ));


});


// Global error handling middleware for express . as a center of error. 
app.use(globalError);


const  serv =  app.listen( process.env.PORT || 3000  , (req,res)=> 
{ console.log('listen to server...')});

mongoose.connect( process.env.DB_URL ).then((data)=> {

    console.log(`connect to ${data.connection.host}`); ///give host connect with mongo 
});


//// to handle error outside express but must be async & await with events => listen on event 



process.on('unhandledRejection' , (error)=>{

  // console.error(`UnhandledRejection error :  ${error.name} | ${error.message } `);
  /* serv.close(()=>{

  console.log('server shut down ');

  // close server to close requests then close app 
  process.exit(); // to exit from application or close mode application

});*/


});




/*
  process.on => listen on any error from unhandledRejection .

*/



















/*
  1.npm init --y == yes 
  2.npm i express --save


  3. npm i -D nodemon == على مستوى المشروع فقط 
  4. npm i -g nodemon == علي كل الابلكشن 
  5. to run server => npm start 
  6. port num change from dev to device or change from development on production so that use config.env
   7. to access config.env => npm i dotenv .


   8. morgan use to => login for http requests 
   HTTP request logger middleware for node.js
   morgan => use in development only

   9. midleware => thing between request and response 
   10. middleware use before routes ..


   note : enviroment variable => not contain ; && ""
   if name of file == .env => not write config({path})

   ------------------------------------------

  app.use(morgan('dev')); // use morgan format in development 

  -------------------------------------------

  use Mongodb (NoSql) :-
  1.local
  2.hosted service (atls) => upload on cloud


  mongodb => شغالة مع اى نوع من الداتا بيز بس هى فعالة اكتر مع الnosql


  node   GUI   mongodb   => GUI == software development بستخدمها عشان اشوف الداتا بيز بدل ما افتح كل شوية المونجو 

  cluster => عبارة عن كونتينر فيها كل الداتا بيز بتاعتى

  2ways to connect mongodb =>
  1. compase
  2.application

  -------

config.env => اما اغير فيها اى حاجة لازم اقفل السيرفر وافتحه تانى 

schema => map to mongodb collection.

schema => شكل ال collection in database .


------------------------------------------
pagination  => no of page .
------------------------------
next() =>  طالما هتاخد برامتير او اى حاج كدا هتبعتها للايروو هاندل ميدل وير وبتتعرض زى ما ف 
الايروو هاندل 
-----------------------------------------
Tabnine extention => to complete code 

---------------------------------------------------
populate => show name of category not id in sub category 
population => [skip , limit  ]
-------------------------------------------------------------

// GET   /api/v1/categories/:categoryId/subcategories  => اى حاجة ليها parent بتبقي كدا 


*/