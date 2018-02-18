import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validates users signup and signin operations
 * @class Validation
 */
export default class Validation {

  /**
     * Validates all Students signup details before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     * @memberof UserValidations
     */
  static signup(req, res, next) {
    const {
      firstname, lastname, middlename, address, origin, mobile,
      dob, password, staff_id, sex, retypePass
    } = req.body;

    const errors = {};

    if (firstname === undefined || lastname === undefined || password === undefined || retypePass === undefined
    || middlename === undefined || address === undefined || origin === undefined || mobile === undefined 
    || dob === undefined || staff_id === undefined || sex === undefined) {
      return res.status(400).send({
        message: 'All or some fields are not defined',
      });
    }

     // validate firstname
    if (!validator.isEmpty(firstname)) {
      if (!validator.isLength(firstname, { min: 2, max: 20 })) {
        errors.fullname = 'Firstname must be more than 2 characters but less than 20';
      }
      if (!/^[a-zA-Z ]+$/.test(firstname)) {
        errors.fullname = 'Firstname can only contain letters';
      }
    } else {
      errors.fullname = 'Firstname cannot be blank';
    }
    
    // validate lastname
    if (!validator.isEmpty(lastname)) {
      if (!validator.isLength(lastname, { min: 2, max: 20 })) {
        errors.lastname = 'Lastname must be more than 2 characters but less than 20';
      }
      if (!/^[a-zA-Z ]+$/.test(lastname)) {
        errors.lastname = 'Lastname can only contain letters';
      }
    } else {
      errors.lastname = 'Lastname cannot be blank';
    }

    // validate middlename
    if (!validator.isEmpty(middlename)) {
      if (!validator.isLength(middlename, { min: 2, max: 20 })) {
        errors.middlename = 'Middlename must be more than 2 characters but less than 20';
      }
      if (!/^[a-zA-Z ]+$/.test(middlename)) {
        errors.middlename = 'Middlename can only contain letters';
      }
    }

    // validate address
    if (!validator.isEmpty(address)) {
      if (!validator.isLength(address, { min: 5, max: 100 })) {
        errors.fullname = 'Address must be more than 5 characters but less than 20';
      }
      if (!/^[a-zA-Z0-9, ]+$/.test(address)) {
        errors.address = 'Ad can only contain numbers and letters and comma';
      }
    } else {
      errors.address = 'address cannot be blank';
    }

    // validate origin
    if (!validator.isEmpty(origin)) {
      if (!validator.isLength(origin, { min: 4, max: 20 })) {
        errors.origin = 'State of origin must be more than 4 characters but less than 20';
      }
      if (!/^[a-zA-Z ]+$/.test(origin)) {
        errors.origin = 'State of origin can only contain letters';
      }
    } else {
      errors.origin = 'State of origin cannot be blank';
    }

    // validate mobile
    if (!validator.isEmpty(mobile)) {
      if (!validator.isLength(mobile, { min: 11, max: 50 })) {
        errors.mobile = 'Mobile number cannot be less than 11 digits';
      }
      if (!/^[0-9, ]+$/.test(lastname)) {
        errors.fullname = 'Mobile number can only contain numbers';
      }
    } else {
      errors.fullname = 'Mobile number cannot be blank';
    }

    // validate dob
    if (validator.isEmpty(dob)) {
      errors.dob = 'Date of birth cannot be blank';
    }

    // validate student id
    if (!validator.isEmpty(staff_id)) {
      if (!/^[a-zA-Z0-9]+$/.test(staff_id)) {
        errors.staff_id = 'Student identification number can only contain numbers and letters';
      }
    } else {
      errors.staff_id = 'Lastname cannot be blank';
    }

    //validate password
    if (!validator.isEmpty(password)) {
      if (!validator.isLength(password, { min: 5, max: 20 })) {
        errors.password = 'Password length must be between 5 and 20';
      }
    } else { errors.password = 'Password is required'; }

    //validate password
    if (!validator.isEmpty(retypePass)) {
      if (retypePass !== password) {
        errors.retypePass = 'Password must match';
      }
    } else { errors.retypePass = 'Type Password Again'; }

    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    next();
  }

  /**
     * Validates signin form input fields before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     * @memberof UserValidations
     */
  static signin(req, res, next) {
    const { login_staff_id, login_password } = req.body;

    const errors = {};
    if (login_staff_id === undefined || login_password === undefined) {
      return res.status(400).send({
        message: 'Email or Password is undefined',
      });
    }

    if (validator.isEmpty(login_staff_id)) {
      errors.login_staff_id= 'Student ID is required';
    }

    if (validator.isEmpty(login_password)) {
      errors.login_password = 'Password is required';
    }

    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
  }

  static recoverPassword(req, res, next) {
    const { staff_id } = req.body;
    const error = {};

    if (staff_id === undefined) {
      error.staff_id = 'Student ID is required';
    }

    const isValid = Object.keys(error).length === 0;

    if (!isValid) {
      return res.status(400).send(error);
    }
    next();
  }

  static updateStaffInfo(req, res, next) {
    const {
      firstname, lastname, middlename, address, origin, mobile,
      dob, password, retypePass,
    } = req.body;

    const error = {};

    Object.entries(req.body).forEach((entry) => {

      if (isEmpty(entry[1])) {
        entry[1] = null;
      }

      //validate firstname
      if (entry[0] === 'firstname') {
        if (entry[1] !== null) {
          if (!validator.isLength(firstname, { min: 2, max: 20 })) {
            errors.fullname = 'Firstname must be more than 2 characters but less than 20';
          }
          if (!/^[a-zA-Z ]+$/.test(firstname)) {
            errors.fullname = 'Firstname can only contain letters';
          }
        }
      }

      //validate lastname
      if (entry[0] === 'lastname') {
        if (entry[1] !== null) {
          if (!validator.isLength(lastname, { min: 2, max: 20 })) {
            errors.lastname = 'Lastname must be more than 2 characters but less than 20';
          }
          if (!/^[a-zA-Z ]+$/.test(lastname)) {
            errors.lastname = 'Lastname can only contain letters';
          }
        }
      }

      //validate middlename
      if (entry[0] === 'middlename') {
        if (entry[1] !== null) {
          if (!validator.isLength(middlename, { min: 2, max: 20 })) {
            errors.middlename = 'Middlename must be more than 2 characters but less than 20';
          }
          if (!/^[a-zA-Z ]+$/.test(middlename)) {
            errors.middlename = 'Middlename can only contain letters';
          }
        }
      }

      // validate address
      if (entry[0] === 'address') {
        if (!validator.isLength(address, { min: 5, max: 100 })) {
          errors.fullname = 'Address must be more than 5 characters but less than 20';
        }
        if (!/^[a-zA-Z0-9, ]+$/.test(address)) {
          errors.address = 'Ad can only contain numbers and letters and comma';
        }
      }

      // validate origin
      if (entry[0] === 'origin') {
        if (!validator.isLength(origin, { min: 4, max: 20 })) {
          errors.origin = 'State of origin must be more than 4 characters but less than 20';
        }
        if (!/^[a-zA-Z ]+$/.test(origin)) {
          errors.origin = 'State of origin can only contain letters';
        }
      } 

      //validate mobile
      if (entry[0] === 'mobile') {
        if (!validator.isLength(mobile, { min: 11, max: 50 })) {
          errors.mobile = 'Mobile number cannot be less than 11 digits';
        }
        if (!/^[0-9, ]+$/.test(lastname)) {
          errors.fullname = 'Mobile number can only contain numbers';
        }
      } 

      //validate password
      if (entry[0] === 'password') {
        if (entry[1] !== null) {
          if (!validator.isLength(password, { min: 5, max: 20 })) {
            error.password = 'Password length must be between 5 and 20';
          }
        }
      }

      if (entry[0] === 'retypePass') {
        if (entry[1] !== null) {
          if (retypePass !== password) {
            error.retypePass = 'Password must match';
          }
        }
      }
      return error;
    });
    const isValid = Object.keys(error).length === 0;

    if (!isValid) {
      return res.status(400).send(error);
    }
    next();
  }
}
