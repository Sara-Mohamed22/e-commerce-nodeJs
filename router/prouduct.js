const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler') 

const slugify = require('slugify');

const Product = require("../model/productModel");

const { createProduct , getProduct , updateProduct , deleteProduct } = require("../utlis/validator/productValidator")



route.post('/', createProduct , asyncHandler(async (req, res, next) => {

    req.body.slug = slugify(req.body.title)
    const products = await Product.create( req.body );

    res.status(201).json({
        status : "add successfully!",
        data : products

}); }));



route.get('/' , asyncHandler(async  (req,res,next) =>{

    const products = await Product.find({});
    res.status(200).json({
        status : "get successfully!",
        data : products

})}));


route.get('/:id' , getProduct , asyncHandler( async (req,res,next) =>{

    const product = await Product.findById(req.params.id);
    res.status(200).json({
        status : "get successfully!",
        data : product

})}));


route.put('/:id' ,updateProduct , asyncHandler( async (req,res,next) =>{

    req.body.slug = slugify(req.body.title);
    const product = await Product.findOneAndUpdate({_id: req.params} ,  req.body ,{new: true } );
    res.status(200).json({
        status : "get successfully!",
        data : product

})}));



route.delete('/:id' , deleteProduct , asyncHandler( async (req,res,next) =>{

     await Product.findByIdAndDelete(req.params );
    res.status(200).json({
        status : "get successfully!",

})}));






module.exports = route ;
