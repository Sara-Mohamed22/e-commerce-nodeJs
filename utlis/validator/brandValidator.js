const {check} = require('express-validator');
const validatorMidleware = require('../../middleware/validatorMidleware');


exports.createBrand = [

    check('name').notEmpty().withMessage('Enter this Field'),
    validatorMidleware

  ];


 exports.getBrand = [

    check('id').notEmpty().withMessage('Enter this Field').isMongoId().withMessage('Enter valid ID'),
    validatorMidleware

  ];


 exports.updateBrand = [

    check('id').notEmpty().withMessage('Enter this Field').isMongoId().withMessage('Enter valid ID'),
    validatorMidleware

  ];


 exports.deleteBrand = [

    check('id').notEmpty().withMessage('Enter this Field').isMongoId().withMessage('Enter valid ID'),
    validatorMidleware
    
  ];
