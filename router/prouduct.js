const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler') 

const slugify = require('slugify');

const Product = require("../model/productModel");





const {
     createProduct ,
      getProduct ,
       updateProduct ,
        deleteProduct } = require("../utlis/validator/productValidator")



        
route.post('/', createProduct , asyncHandler(async (req, res, next) => {
    console.log(`5555555 ${req.body.price}`);

    req.body.slug = slugify(req.body.title)

    const products = await Product.create( req.body );

    res.status(201).json({
        status : "add successfully!",
        data : products

}); }));



route.get('/' , asyncHandler(async  (req,res,next) =>{

// filtering

    const queryStringObj ={...req.query };
    const excuteStringObj = ["page", "limit" , "sort" , "fieldes"];

    excuteStringObj.forEach((field)=>{
      delete queryStringObj[field];
    });

    
   console.log(queryStringObj);

  let queryStri = JSON.stringify(queryStringObj);
  queryStri = queryStri.replace(/\b(gtl|gt|lt|lte)\b/g , match => `$${match}`);



    // pagination 
    const page = req.query.page *1 || 1 ;
    const limit = req.query.limit *1 || 5 ;
    const skip = (page-1)* limit ; 

   //  filtering with greater than && lower than 
    //  { price : {$gte:50 } , ratingsAverage : {$lte :50} }
    //  { price: { gte: '50' }, ratingsAverage: { gte: '5' } }
    //   gte === greater than or equal


  /*  const products = await Product.find({}).where('price').equals(req.query.price).  // filteration with mongoose 
    where("ratingsAverage").equals(req.query.ratingsAverage)*/
    const products = await Product.find(queryStringObj) // use filteration 
    // const products = await Product.find({})
    .skip(skip).limit(limit).populate( { path: "category" , select : "name -_id"});
    res.status(200).json({
        result: products.length ,

        status : "get successfully!",
        data : products,
        page ,
        limit
})}));


route.get('/:id' , getProduct , asyncHandler( async (req,res,next) =>{

    const product = await Product.findById(req.params.id).populate( { path: "category" , select : "name -_id"});
    res.status(200).json({
        status : "get successfully!",
        data : product

})}));


route.put('/:id' ,updateProduct , asyncHandler( async (req,res,next) =>{

    if(req.body.title)
    {
        req.body.slug = slugify(req.body.title);
    }

    const product = await Product.findOneAndUpdate({_id: req.params.id } , req.body ,{new: true } );
    res.status(200).json({
        status : "update successfully!",
        data : product

})}));



route.delete('/:id' , deleteProduct , asyncHandler( async (req,res,next) =>{

     await Product.findByIdAndDelete(req.params.id );
    res.status(200).json({
        status : "delete successfully!",

})}));






module.exports = route ;
