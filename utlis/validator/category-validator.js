

const { check  } = require('express-validator'); //validator on field before send data 
const validatorMidleware = require('../../middleware/validatorMidleware')


exports.getCategoryValidator = [

    check('id').isMongoId().withMessage('Invalid Category id format !'),
     validatorMidleware 

];


exports.createValidator = [
    check('name').notEmpty().withMessage('Category required').
    isLength({min:3}).withMessage("too short category name").
    isLength({max:50}).withMessage("too long category name"),
    validatorMidleware 

];



exports.updateCategoryValidator = [
     check('id').isMongoId().withMessage('Invalid Category id format !'),
      validatorMidleware 
       ];


exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category id format !'),
     validatorMidleware 
       ];
