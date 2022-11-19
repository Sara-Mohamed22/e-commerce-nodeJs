const check = require('express-validator');
const validatorMidleware = require('../../middleware/validatorMidleware');


exports.createProduct = [ 
    check('title').isLength({min:3 }).withMessage('Title must be at least 3 characters').
    notEmpty().withMessage('Enter a title') ,

    check('description').isLength({max : 200 }).withMessage('Description must be at least').
    notEmpty().withMessage('Enter a description'),

    check('quantity').notEmpty().withMessage('Product quantity is required').
    isNumeric().withMessage('Product quantity must be a number'),


    check('price').notEmpty().withMessage('Product price is required').
    isNumeric().withMessage('Product quantity must be a number'),


    check('sold').optional().isNumeric().withMessage('Product quantity must be a number'),


    check('priceAfterDiscount').optional().toFloat().isNumeric()
    .withMessage('Product priceAfterDiscount must be a number').
    custom((value , req )=>{
        if(req.body.price <= value ) throw new Error(' priceAfterDiscount must be lower than price ...')

        return true ;
    }),


    check('colors').optional().isArray().withMessage('colors must be an array'),

    check('imageCover').notEmpty().withMessage('This field required'),

    check('images').optional().isArray().withMessage('images must be an array'),


    check('category').notEmpty().withMessage('enter category..')
    .isMongoId().withMessage('Invalid Id category '),


    check('brand').optional().isMongoId().withMessage('Invalid Id brand '),


    check('subCategory').optional().isMongoId().withMessage('Invalid Id subcategory'),


    check('ratingsAverage').isNumeric().withMessage('ratingsAverage must be a number').
    isLength({min:1}).withMessage('ratingsAverage must be at least 1').
    isLength({max:5}).withMessage('ratingsAverage must be at 5'),



    check('ratingsquantity').isNumeric().withMessage('ratingsquantity must be number'),




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


