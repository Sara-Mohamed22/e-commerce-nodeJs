
const mongoose = require('mongoose');



//1. create schema
const categorySchema = mongoose.Schema({
    name : {
        
        type :String ,
        required : [true , "Category Name Required"] ,
        unique : [true , "Category must be unique"] ,
        minlength : [3 , "too short category name"],
        maxlength : [50 , "too long category name"]

    },


    // slug => remove space and replace with - == A and b == A-and-b
    slug:
    {
        type : String ,
        lowercase : true
    },

    image: String
    
}, 
{
    timestamps : true  // add 2[ createdAt ,updatedAt ] field in database to get الاحدث والاقدم
});


//2. create model  => convert schema 

module.exports =  mongoose.model("Category" , categorySchema );  // model =>(name of model , schema )


