
const {check }= require('express-validator');
const validatorMidleware = require('../../middleware/validatorMidleware');


exports.createSubCategory =[

    // eslint-disable-next-line no-unused-expressions
    check('name').notEmpty().withMessage('this Field Required').
    isLength({min:2}).withMessage("too short subCategory name ").
    // eslint-disable-next-line no-sequences
    isLength({max:32}).withMessage("too long subCategory name "),


    check('category').notEmpty().withMessage('this Field Required').isMongoId().withMessage('this ID is Invalid..'),

    validatorMidleware

];


  exports.getSingleSubCategory = [
  check('id').notEmpty().withMessage('this Field Required').isMongoId().withMessage('this ID is Invalid..'),
  validatorMidleware


];




exports.updateSubCategory = [

  check('id').isMongoId().withMessage('this ID is Invalid..'),

  check('name').notEmpty().isLength({min:2}).withMessage('too short'),

  check('category').isMongoId().withMessage('this ID is Invalid..'),

  validatorMidleware

];




exports.deleteSubCategory = [

  check('id').notEmpty().withMessage('please enter this field').
  isMongoId().withMessage('this ID is Invalid..'),

  validatorMidleware

];




