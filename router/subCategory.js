
const express = require('express');

const route = express.Router({ mergeParams: true}); //allow us => categories to access subCategories . 

const asyncHandler = require('express-async-handler') 

const slugify = require('slugify');


const SubCategory = require("../model/subCategoryModel");
const ApiError = require('../utlis/apiError');

const { createSubCategory , getSingleSubCategory , updateSubCategory , deleteSubCategory  } = require("../utlis/validator/subCategory-validator")
  


route.post('/' , (req,res ,next )=>{


  if(!req.body.category )  {

    req.body.category = req.params.categoryId;
  
  }
    next();
  
} ,

  createSubCategory ,
 asyncHandler( async (req,res)=>{


       const sub =  await SubCategory.create({ name: req.body.name ,
         slug : slugify(req.body.name),
         category: req.body.category ,
        });
       res.status(201).json({data : sub });


   }));




route.get('/' , (req,res ,next)=>
{
    let filterObject = {};
    if( req.params.categoryId ) filterObject = { category : req.params.categoryId }; 
    req.filterObject = filterObject ; 

    next();
    
} ,
 asyncHandler( async(req,res, next)=>{

  const page = req.query.page *1 || 1 ;
  const limit = req.query.limit *1 || 5 ;
  const skip = (page-1) * limit ;

  
  const allSubCategory = await SubCategory.find(req.filterObject).skip(skip).limit(limit).
  populate({path :"category" , select: "name -_id"});


 if(!allSubCategory)
 {
  return next(new ApiError( 'No Sub Category found ..', 404));
 }

   res.status(200).json({data : allSubCategory });

}));



   route.get('/:id', getSingleSubCategory , asyncHandler(async (req ,res)=>{
        
    const subCategory = await  SubCategory.findById(req.params.id).populate({path : "category" , select :"name -_id"}); // show name of category only 
      res.status(200).json({ data : subCategory });

   }));


   route.put('/:id', updateSubCategory  , asyncHandler(async (req,res)=>{

    const subCategory = await SubCategory.findOneAndUpdate(
      {_id:req.params.id },

      {
        name : req.query.name ,
        slug : slugify(req.query.name ),
        category : req.query.category

      },

      {new: true }).populate("category");

       res.status(200).json({ data : subCategory , msg : 'update successfully ..' });

   }));




   route.delete('/:id', deleteSubCategory , asyncHandler(async (req,res)=>{
    const subCategory = await SubCategory.findByIdAndRemove(req.params.id);
    res.status(200).json({ data : subCategory });
   }));



   module.exports = route;