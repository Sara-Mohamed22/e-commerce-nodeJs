const {check} = require('express-validator');
const slugify = require('slugify');
const validatorMidleware = require('../../middleware/validatorMidleware');
const ApiError = require('../apiError');

const Category = require("../../model/category");
const SubCategory = require("../../model/subCategoryModel");


exports.createProduct = [ 
    check('title').
    notEmpty().withMessage('Enter a title').
    isLength({min:3 }).withMessage('Title must be at least 3 characters').
    custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }) ,

    check('description').
    notEmpty().withMessage('Enter a description')
    .isLength({max : 2000 }).withMessage('Description must be at least'),

    check('quantity').notEmpty().withMessage('Product quantity is required').
    isNumeric().withMessage('Product quantity must be a number'),


    check('price').notEmpty().withMessage('Product price is required').
    isNumeric().withMessage('Product quantity must be a number'),


    check('sold').optional().isNumeric().withMessage('Product quantity must be a number'),


    check('priceAfterDiscount').optional().isNumeric()
    .withMessage('Product priceAfterDiscount must be a number').toFloat().
    custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),


    check('colors').optional().isArray().withMessage('colors must be an array'),

    check('imageCover').notEmpty().withMessage('This field required'),

    check('images').optional().isArray().withMessage('images must be an array'),

   

    check('category').notEmpty().withMessage('enter category..').isMongoId().
    withMessage('Invalid Id category ').custom( async (categoryId) =>{
      console.log(`kkk ${categoryId}`);

      await Category.findById(categoryId).then((value)=> {
        console.log(value);

        if(!value) {
          console.log('yyy')
          return Promise.reject(new Error(`No Category found with id ${  categoryId}`));
        }
      });
    })

    ,



    check('brand').optional().isMongoId().withMessage('Invalid Id brand '),


    check('subCategory').optional().isMongoId().withMessage('Invalid Id subcategory').
    custom( async(subCategoriesIDS)=>{

       await SubCategory.find({ _id: {$exists: true , $in: subCategoriesIDS}}).then((results)=>{
            console.log(`lenggg${ results.length}`);

            // eslint-disable-next-line eqeqeq
            if(results.length === 0 || results.length != subCategoriesIDS.length ) {
            return Promise.reject(new Error('subCategory not found'));}

          });
      
    }).custom( async (val , {req} )=>{

      await  SubCategory.find({category : req.body.category }).then((SubCategories)=>{
        console.log(`aaaaa ${SubCategories.length}`);
        const subCategoriesIDDB = [] ;
        SubCategories.forEach((subCategory)=> {
          subCategoriesIDDB.push(subCategory._id.toString());

        });

        console.log(`87 ${subCategoriesIDDB}`);

        const checker = val.every((value)=> subCategoriesIDDB.includes(value))

        console.log(checker);

        if(!checker) {
          return Promise.reject(new Error('This Categories not belong to category'));
        }

      })
    }),


    check('ratingsAverage').isNumeric().withMessage('ratingsAverage must be a number').
    isLength({min:1}).withMessage('ratingsAverage must be at least 1').
    isLength({max:5}).withMessage('ratingsAverage must be at 5'),



    check('ratingsquantity').optional().isNumeric().withMessage('ratingsquantity must be number'),




    validatorMidleware


];



exports.getProduct = [

    check('id').notEmpty().withMessage('Enter this Field').isMongoId().withMessage('Enter valid ID'),
    validatorMidleware

  ];


 exports.updateProduct = [

    check('id').notEmpty().withMessage('Enter this Field').isMongoId().withMessage('Enter valid ID'),
    validatorMidleware

  ];


 exports.deleteProduct = [

    check('id').notEmpty().withMessage('Enter this Field').isMongoId().withMessage('Enter valid ID'),
    validatorMidleware
    
  ];


