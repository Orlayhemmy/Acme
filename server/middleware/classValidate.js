import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default class Validation {

  static createClass(req, res, next){
    const { classname } = req.body;

    const errors = {};

    if (classname === undefined) {
      return res.status(400).send({
        message: 'All or some fields are not defined',
      });
    }

    // validate classname
    if (!validator.isEmpty(classname)) {
      if (!validator.isLength(classname, { min: 2, max: 20 })) {
        errors.classname = 'classname cannot be less than 2 characters';
      }
      if (!/^[a-zA-Z0-9 ]+$/.test(classname)) {
        errors.classname = 'classname can only contain letters and numbers';
      }
    } else {
      errors.classname = 'classname cannot be blank';
    }

    const isValid = Object.keys(errors).length === 0;
    
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      next();
  }

  static updateClass(req, res, next) {
    const { classname } = req.body;
    
        const errors = {};
    
        // validate classname
        if (!validator.isEmpty(classname)) {
          if (!validator.isLength(classname, { min: 2, max: 20 })) {
            errors.classname = 'classname cannot be less than 2 characters';
          }
          if (!/^[a-zA-Z0-9 ]+$/.test(classname)) {
            errors.classname = 'classname can only contain letters and numbers';
          }
        } 
    
        const isValid = Object.keys(errors).length === 0;
        
          if (!isValid) {
            return res.status(400).json(errors);
          }
      
          next();
  }
}