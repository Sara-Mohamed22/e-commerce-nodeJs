
const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler');

const slugify = require('slugify')
const Brand = require("../model/brandModel");

const { createBrand , getBrand , updateBrand , deleteBrand } = require("../utlis/validator/brandValidator");

const ApiError = require("../utlis/apiError");


route.post('/', createBrand , asyncHandler(async (req,res , next)=>{
    const brand = await Brand.create({
        name : req.body.name , 
        slug : slugify(req.body.name) ,
    });


    res.status(201).json({
        data : brand
    });

}));

route.get('/', asyncHandler(async (req,res, next)=>{

     const page= req.query.page || 1;
     const limit = req.query.limit || 1;
     const skip = (page-1) * limit ;

    const brands = await Brand.find({}).skip(skip).limit(limit);
    if(!brands) { return new ApiError('No Brand Found !' , 404)}

    res.status(200).json({
        data: brands,
        length: brands.length ,
        page: page,
        limit: limit,

    });

}
));

route.get('/:id', getBrand , asyncHandler(async (req,res, next)=>{

    const brand = await Brand.findById(req.params.id);

     res.status(200).json({
        data: brand
       });

}
));


route.put('/:id',updateBrand , asyncHandler(async (req,res,next)=>{

    const brand = await Brand.findOneAndUpdate({ _id :req.params.id },{
        name: req.body.name ,
         slug:slugify(req.body.name)} , {new : true });

         res.status(200).json({
            brand : brand
    });

}));


route.delete('/:id', deleteBrand , asyncHandler(async (req,res,next)=>{
    // const brand = await Brand.findByIdAndRemove(req.params.id);
    res.status(200).json({
        message : 'Delete Successfully'
    });


}));


module.exports = route;










