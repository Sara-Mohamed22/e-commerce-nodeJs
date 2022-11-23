const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title : {
        type: String ,
        trim: true ,
        required: true,
        minLength : [3 , "too short product title"] ,
        maxLength : [100 , "too long Product title"],
        
    },
     slug :{
        type: String,
        trim: true,
        lowercase : true,

     },

     description :{
        type : String ,
        required :[true , "Product description is Required"] ,
        minLength :[20 , "too short description"],
     },

     quantity:{
        type: Number,
        required :[true, "Product quantity is Required"],

     },

     sold :{
        type: Number,
        default:0 
     },

     price:{
        type: Number,
         required :[true, "Product price is Required"],
         trim:true,
         max: [20000, "too long product price"],
     },

     priceAfterDiscount:{
        type: Number,
     },

     imageCover: {
        type: String,
        required:[true , "Product image cover"] ,

     },
     colors: [String], // array of colors
     images :[String] ,

   
     category : {
        type : mongoose.Schema.ObjectId ,
        ref : 'Category',
        required:[true , "product must be belong to Parent Category"]
     },

     brand :{
        type: mongoose.Schema.ObjectId,
        ref : 'Brand',
     } ,

     
     subCategory:[{
        type: mongoose.Schema.ObjectId,
        ref : 'SubCategory',


     }],

//min & max => Number
// minLength & maxLength => String 

     ratingsAverage : {
        type: Number,
        min: [1, "Rating must be at least 1 or above"],
        max: [5, "Rating must be at most 5 or below"]

     },

     ratingsquantity : {
        type: Number,
        default:0 
     }

},
    {timesstaps:true});



module.exports = mongoose.model("Product", productSchema);