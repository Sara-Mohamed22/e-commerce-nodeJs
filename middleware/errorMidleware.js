


const globalError = ( error, req , res , next )=>{  //midleware to handle error and status code 

    error.statusCode = error.statusCode || 500 ;
    error.status = error.status || 'error' ;
  
     if(process.env.NODE_ENV === "development" )
     {
        // eslint-disable-next-line no-use-before-define
        sendErrorForDev(error , res );
     }

     else
     {
      // eslint-disable-next-line no-use-before-define
      sendErrorForProduction(error , res );
     }

     };




   const sendErrorForDev = ( error,res )=>{

    res.status( error.statusCode ).json({
      status : error.status ,
      error : error,
      message : error.message ,
      stack : error.stack    //stack => error فين
  
    });
    };


    const sendErrorForProduction = ( error,res )=>{

      res.status( error.statusCode ).json({
        status : error.statusCode ,
        message : error.message ,
    
      });
      };


  module.exports = globalError ;


  /*
   to run server in production mode => package.json => scripts => start:prod : "NODE_ENV=production node server.js"
  
  */