import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Staffs, Class, Subjects, Department } = models;

env.config();

export default class StaffController {
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
        dob, password, staffId, sex, classId, subjectId, deptId } = req.body;
    Staffs.findOne({
      where: {
        staffId,
      },
    }).then((foundUser) => {
      const error = staffId;
      if (foundUser) {
        return res.status(400).send({
          message: `The Staff Identification number ${error} is registered already`,
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
          const emp_id = staffId.toLowerCase();
      
          Staffs.create({
            firstname: fname,
            lastname: lname,
            middlename: mname,
            address: home,
            origin: origin_state,
            mobile,
            dob,
            staffId: emp_id,
            sex,
            password: hash,
            subjectId,
            classId,
            deptId,
          }).then(() => {
            Staffs.findOne({
              where: {
                staffId,
              },
              include: [{
                model: Class,
              },
              {
                model: Department,
              },
              {
                model: Subjects,
              }],
            }).then((user) => {
              const payload = { 
                lastname: user.lastname, 
                id: user.id, 
                classId: user.classId, 
                subjectId: user.subjectId, 
                subject: user.Subject.subjectname, 
                deptId: user.deptId, 
                deptname: user.Department.dept_name, 
              };
              const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: 60 * 60 * 12,
              });
              req.body.token = token;
              
              return res.status(201).send({
                message: 'You are now Signed Up',
                data: {
                  id: user.id,
                  staffId: user.staffId,
                },
                token,
              });
            }).catch(error => res.status(500).send({
              message: error.message,
            }));
          });
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
    Staffs.findOne({
      where: {
        staffId: loginId,
      },
      include: [{
        model: Class,
      },
      {
        model: Department,
      },
      {
        model: Subjects,
      }],
    }).then((user) => {
      if (user && user.staffId === loginId) {

        const check = bcrypt.compareSync(loginPassword, user.password);
        if (check) {
          const payload = { 
            lastname: user.lastname,
            id: user.id, 
            classId: user.classId, 
            subjectId: user.subjectId, 
            subject: user.Subject.subjectname, 
            deptId: user.deptId, 
            deptname: user.Department.dept_name, 
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
          message: 'Invalid id or password',
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
      const { staffId } = req.body;
  
      Staffs.findOne({
        where: {
          staffId,
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
      dob, password, staffId, sex, classId } = req.body;
      
      Staffs.findOne({
        where: {
          staffId,
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
              classId: classId || user.classId
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
            employees,
          });
        }
        // No employee found
        return res.status(404).send({
          message: 'There are no registered staffs',
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
          staffId: req.params.staffId,
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