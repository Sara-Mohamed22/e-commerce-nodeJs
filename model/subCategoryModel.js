const mongoose = require('mongoose');


// mongoose.Schema({ shap of schema } , { option of schema })

const subCategorySchema = mongoose.Schema({
     name:
        {

        type : String ,
        required : [true , "Category Name Required"] ,
        trim:true ,
        unique :[true , "subCategory must be unique.."] ,
        minlength: [2, "too short subCategory name "] ,
        maxlength: [32, "too long subCategory name "] 

        },

        slug: 
        {
            type : String ,
            lowercase : true 
        },


        /// like as forein key in sql 
        category:
        {
            type : mongoose.Schema.ObjectId, 
            ref:"Category" ,
            required : [true ,"SubCategory must be belong to Parent Category "]

        }

       } ,
     {
        timestamps : true 
    } ); 



     module.exports =  mongoose.model("SubCategory" , subCategorySchema );

