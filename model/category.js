
const mongoose = require('mongoose');



const categorySchema = mongoose.Schema({
    name : {
        
        type :String ,
        required : [true , "Category Name Required"] ,
        unique : [true , "Category must be unique"] ,
        minlength : [3 , "too short category name"],
        maxlength : [50 , "too long category name"]

    },


    slug:
    {
        type : String ,
        lowercase : true
    },

    image: String
    
}, 
{
    timestamps : true   
});



module.exports =  mongoose.model("Category" , categorySchema );  


