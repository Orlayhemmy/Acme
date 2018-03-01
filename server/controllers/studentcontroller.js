import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Students } = models;

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
       dob, password, studentId, sex, classId } = req.body;

    Students.findOne({
      where: {
        studentId,
      },
    }).then((foundUser) => {
      const error = studentId;
      if (foundUser) {
        return res.status(400).send({
          message: `The Admission number ${error} is registered already`,
        });
      }
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const fname = firstname.toLowerCase();
          const lname = lastname.toLowerCase();
          const mname = middlename.toLowerCase();
          const origin_state = origin.toLowerCase();
          const home = address.toLowerCase();
          const std_id = studentId.toLowerCase();
        
          Students.create({
            firstname: fname,
            lastname: lname,
            middlename: mname,
            address: home,
            origin: state_origin,
            mobile,
            dob,
            studentId: std_id,
            sex,
            password: hash,
            classId,
          }).then((user) => {
              const payload = { id: user.id, lastname, classId, fullname: `${firstname} ${lastname}`, isStudent: true };
              const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: 60 * 60 * 12,
              });
              req.body.token = token;
              return res.status(201).send({
                message: 'You are now Signed Up',
                data: {
                  studentId,
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
    const { loginId, loginPassword } = req.body;

    Students.findOne({
      where: {
        studentId: loginId,
      },
    }).then((user) => {
      if (user && user.studentId.toLowerCase === loginId.toLowerCase) {
        const check = bcrypt.compareSync(loginPassword, user.password);
        if (check) {
          const payload = { 
            id: user.id, 
            lastname: user.lastname,
            classId: user.classId, 
            fullname: `${user.firstname} ${user.lastname}`,
            isStudent: true,
          };
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
          message: 'Invalid Id or password',
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
    const { studentId } = req.body;

    Students.findOne({
      where: {
        studentId,
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
    dob, password, studentId, sex} = req.body;
    
    Students.findOne({
      where: {
        studentId,
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
 /**
 * 
 * 
 * @static getAllStudents
 * @param {any} req 
 * @param {any} res 
 * @memberof StudentController
 */
  static getClassStudents(req, res) {
    Students.findAll({
      where: {
        classId: req.params.classId,
      }
    }).then((users) => {
      if (users) {
        // show students
        return res.status(200).send({
          users,
        });
      }
      // No student found
      return res.status(404).send({
        message: 'There are no registered students in the class',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
  * 
  * 
  * @static getSingleStudent
  * @param {any} req 
  * @param {any} res 
  * @memberof StudentController
  */
  static getSingleStudent(req, res) {
    Staffs.findOne({
      where: {
        studentId: req.params.studentId,
      },
    }).then((user) => {
        if (user) {
          return res.status(200).send({
            user,
          });
        }
        return res.status(400).send({
          message: 'Student not found',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
  }
}