
export default class StudentController {
  /**
   * 
   * 
   * @static signup
   * @param {any} req 
   * @param {any} res 
   * @memberof StudentController
   */
    static signup(req, res) {
      const { firstname, lastname, middlename, address, origin, mobile,
         dob, password, staff_id, sex} = req.body;
  
      Staffs.findOne({
        where: {
          staff_id,
        },
      }).then((foundUser) => {
        const error = staff_id;
        if (foundUser) {
          return res.status(400).send({
            message: `The Staff Identification number ${error} is registered already`,
          });
        }
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            const fname = fullname.toLowerCase();
            const lname = lastname.toLowerCase();
            const mname = middlename.toLowerCase();
            const origin_state = origin.toLowerCase();
            const home = address.toLowerCase();
            const emp_id = staff_id.toLowerCase();
            Staffs.create({
              firstname: fname,
              lastname: lname,
              middlename: mname,
              address: home,
              origin: state_origin,
              mobile,
              dob,
              staff_id: emp_id,
              sex,
              password: hash,
            }).then(() => {
                const payload = { staff_id, firstname };
                const token = jwt.sign(payload, process.env.SECRET, {
                  expiresIn: 60 * 60 * 12,
                });
                req.body.token = token;
                return res.status(201).send({
                  message: 'You are now Signed Up',
                  data: {
                    staff_id,
                    firstname,
                    password,
                  },
                  token,
                });
              }).catch(error => res.status(500).send({
                message: error.message,
              }));
          });
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }
    
    /**
     * 
     * 
     * @static signin
     * @param {any} req 
     * @param {any} res 
     * @memberof StudentController
     */
    static signin(req, res) {
      const { login_staff_id, login_password } = req.body;
  
      Staffs.findOne({
        where: {
          staff_id: login_staff_id,
        },
      }).then((user) => {
        if (user && user.staff_id === login_staff_id) {
          const check = bcrypt.compareSync(login_password, user.password);
          if (check) {
            const payload = { firstname, staff_id };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: 60 * 60 * 12,
            });
            req.body.token = token;
            return res.status(200).send({
              message: 'You are now logged In',
              data: {
                user,
              },
              token,
            });
          }
          return res.status(400).send({
            message: 'Invalid email or password',
          });
        }
        return res.status(404).send({
          message: 'User not found, Please sign up if you are a new user',
        });
      }).catch(error => res.status(500).send({
        status: 'Failed',
        message: error.message,
      }));
    }
  /**
   * 
   * 
   * @static recoverpassword
   * @param {any} req 
   * @param {any} res 
   * @memberof StudentController
   */
    static recoverPassword(req, res) {
      const { staff_id } = req.body;
  
      Staffs.findOne({
        where: {
          staff_id,
        },
      }).then((user) => {
        if (user) {
          return res.status(200).send({
            message: 'User found!',
          });
        }
        return res.status(404).send({
          message: 'The Staff Identification number provided is incorrect or not registered',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
  
    }
  /**
   * 
   * 
   * @static updateStaffInfo
   * @param {any} req 
   * @param {any} res 
   * @memberof StudentController
   */
    static updateStaffInfo(req, res) {
      const { firstname, lastname, middlename, address, origin, mobile,
      dob, password, staff_id, sex} = req.body;
      
      Staffs.findOne({
        where: {
          staff_id,
        },
      }).then((user) => {
        if (user) {
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => Staffs.update({
              firstname: firstname || user.firstname,
              lastname: lastname || user.lastname,
              middlename: middlename || user.middlename,
              address: address || user.address,
              origin: origin || user.origin,
              mobile: mobile || user.mobile,
              dob: dob || user.dob,
              sex: sex || user.sex,
              password: hash || user.password,
            }).then(() => res.status(200).send({
              message: 'Your information has been updated successfully',
            })).catch(err => res.status(500).send({
              message: err.message,
            })));
          });
        } else {
          return res.status(400).send({
            message: 'Staff not found',
          });
        }
      }).catch(err => res.status(500).send({
        message: err.message,
      }));
    }
/**
 * 
 * 
 * @static getAllStaffs
 * @param {any} req 
 * @param {any} res 
 * @memberof StudentController
 */
  static getAllStaffs(req, res) {
      Staffs.findAll().then((employees) => {
        if (employees) {
          // show staffs
          return res.status(200).send({
            centers,
          });
        }
        // No employee found
        return res.status(404).send({
          message: 'There are no registered staff',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }
  /**
   * 
   * 
   * @static getSingleStaff
   * @param {any} req 
   * @param {any} res 
   * @memberof StudentController
   */
    static getSingleStaff(req, res) {
      Staffs.findOne({
        where: {
          staff_id: req.params.id,
        },
      }).then((employee) => {
          if (employee) {
            return res.status(200).send({
              employee,
            });
          }
          return res.status(400).send({
            message: 'Employee not found',
          });
        }).catch(error => res.status(500).send({
          message: error.message,
        }));
    }
  
  }