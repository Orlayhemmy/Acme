
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
       dob, password, student_id, sex} = req.body;

    Students.findOne({
      where: {
        student_id,
      },
    }).then((foundUser) => {
      const error = student_id;
      if (foundUser) {
        return res.status(400).send({
          message: `The Admission number ${error} is registered already`,
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
          const std_id = student_id.toLowerCase();
          Students.create({
            firstname: fname,
            lastname: lname,
            middlename: mname,
            address: home,
            origin: state_origin,
            mobile,
            dob,
            student_id: std_id,
            sex,
            password: hash,
          }).then(() => {
              const payload = { student_id, firstname };
              const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: 60 * 60 * 12,
              });
              req.body.token = token;
              return res.status(201).send({
                message: 'You are now Signed Up',
                data: {
                  student_id,
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
    const { login_student_id, login_password } = req.body;

    Students.findOne({
      where: {
        student_id: login_student_id,
      },
    }).then((user) => {
      if (user && user.student_id.toLowerCase === login_student_id.toLowerCase) {
        const check = bcrypt.compareSync(login_password, user.password);
        if (check) {
          const payload = { firstname, student_id };
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
    const { student_id } = req.body;

    Students.findOne({
      where: {
        student_id,
      },
    }).then((user) => {
      if (user) {
        return res.status(200).send({
          message: 'User found!',
        });
      }
      return res.status(404).send({
        message: 'The Student Identification number provided is incorrect or not registered',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));

  }
/**
 * 
 * 
 * @static updateStudentInfo
 * @param {any} req 
 * @param {any} res 
 * @memberof StudentController
 */
  static updateStudentInfo(req, res) {
    const { firstname, lastname, middlename, address, origin, mobile,
    dob, password, student_id, sex} = req.body;
    
    Students.findOne({
      where: {
        student_id,
      },
    }).then((user) => {
      if (user) {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => Students.update({
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
          message: 'The student with the admission identification number not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }
}