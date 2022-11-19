
const {  validationResult } = require('express-validator'); //validator on field before send data 

const validatorMidleware = (req, res , next )=>{

    const errors = validationResult(req);
     if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }

      next();
    }
     ;


     module.exports = validatorMidleware ;