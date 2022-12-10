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
  queryStri = queryStri.replace(/\b(gte|gt|lt|lte)\b/g , match => `$${match}`);

   console.log(JSON.parse(queryStri));

    // pagination 
    const page = req.query.page *1 || 1 ;
    const limit = req.query.limit *1 || 5 ;
    const skip = (page-1)* limit ; 

  


  

 

    let products = await Product.find(JSON.parse(queryStri)) // use filteration 
    // const products = await Product.find({})
    .skip(skip).limit(limit).populate( { path: "category" , select : "name -_id"});

// sorting === sort

    if(req.query.sort)
    {
        const sortStr = req.query.sort.split(',').join(' ');

        console.log(sortStr);

        console.log(req.query.sort);
       products = await Product.find(JSON.parse(queryStri)) 
      .skip(skip).limit(limit).populate( { path: "category" , select : "name -_id"}).sort(sortStr);  
   }
   else
   {
      products = await Product.find(JSON.parse(queryStri)) 
      .skip(skip).limit(limit).populate( { path: "category" , select : "name -_id"}).sort("-createdAt");
   }
  

   if(req.query.fields)
   {
      const fieldsStr = req.query.fields.split(',').join(' ');

      console.log(fieldsStr);

      products = await Product.find(JSON.parse(queryStri)) 
      .skip(skip).limit(limit).populate( { path: "category" , select : "name -_id"}).select(fieldsStr );
    }

    else
    {
        products = await Product.find(JSON.parse(queryStri)) 
      .skip(skip).limit(limit).populate( { path: "category" , select : "name -_id"}).select("-__v"); 
    }

    // 5. search 
    if(req.query.search)
    {
        const query = {};
        query.$or = [ 

            //options => get small , capital 
             {title: {$regex : req.query.keywords , $options:"i" }} ,  
             { description: {$regex : req.query.keywords , $options: "i"}}];
          products = await Product.find().select("-__v");  
    }

     res.status(200).json({
        result: products.length ,

        status : "get successfully!",
        data : products,
        page ,
        limit
})})



);


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
