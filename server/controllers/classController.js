import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Class, TeacherClasses, Students } = models;

export default class ClassController {
/**
 *
 *
 * @static  createClass
 * @param {any} req
 * @param {any} res
 * @memberof ClassController
 */
  static createClass(req, res) {
    const { classname } = req.body;

    Class.create({
      classname,
    }).then(() => res.status(201).send({
      message: 'Class created'
      })).catch((error) => res.status(500).send({
        message: error.message,
      }));
  }
  /**
 *
 *
 * @static updateClass
 * @param {any} req
 * @param {any} res
 * @memberof ClassController
 */
  static updateClassInfo(req, res) {
    const { classname } = req.body;

    Class.findOne({
      where: {
        id: req.params.id,
      },
    }).then((foundClass) => {
      if (foundClass) {
        Class.update({
          classname: classname || foundClass.classname,
        }).then(() => res.status(200).send({
          message: 'Your information has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Class not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }
  /**
 *
 *
 * @static getAllClasses
 * @param {any} req
 * @param {any} res
 * @memberof ClassController
 */
  static getAllClasses(req, res) {
    Class.findAll().then((classes) => {
      if (classes) {
        // show classes
        return res.status(200).send({
          classes,
        });
      }
      // No class found
      return res.status(404).send({
        message: 'There are no registered classes',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
 *
 *
 * @staticgetSingleClass
 * @param {any} req
 * @param {any} res
 * @memberof ClassController
 */
  static getClassStudents(req, res) {
    Class.findOne({
      where: {
        classId: req.params.id,
      },
      include: [{
        model: Students,
      }],
    }).then((students) => {
      const studentArray = [];
      if (students) {
        Object.entries(students).forEach((entry) => {
          if (entry[0] === 'Students') {
            Object.entries(entry[1]).forEach((subEntry) => {
              studentArray.push(subEntry[1].id);
            });
          }
        });
        return res.status(200).send({
          studentArray,
        });
      }
      return res.status(400).send({
        message: 'Class not found',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
 *
 *
 * @static deleteClass
 * @param {any} req
 * @param {any} res
 * @returns
 * @memberof ClassController
 */
  static deleteClass(req, res) {
    const { id } = req.params;

    return Class.findById(id).then((foundClass) => {
      if (foundClass) {
        return foundClass.destroy().then(() => res.status(200).send({
          message: 'Class Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Class does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getTeacherClasses(req, res) {

    TeacherClasses.findAll({
      where: {
        staffId: req.decoded.id,
      },
      include: [{
        model: Class,
      }],
    }).then((teacherclasses) => {
      if (teacherclasses) {
        const payload = {
          teacherclasses,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          token,
        });
      }
      return res.status(400).send({
        message: 'You have not registered classes yet',
      });
    }).catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
  }

  /**
 *
 *
 * @static  createSubjectClass
 * @param {any} req
 * @param {any} res
 * @memberof ClassController
 */
  static createSubjectClass(req, res) {
    const { classId } = req.body;
    TeacherClasses.findOne({
      where: {
        staffId: req.decoded.id,
        classId,
      },
    }).then((foundclass) => {
      if (foundclass) {
        return res.status(400).send({
          message: 'class already added',
        });
      }
      TeacherClasses.create({
        classId,
        staffId: req.decoded.id,
      }).then(() => res.status(201).send({
      message: 'done'
      })).catch((error) => res.status(500).send({
        message: error.message,
      }));
    });
  }
  /**
  *
  *
  * @static deleteTeacherClass
  * @param {any} req
  * @param {any} res
  * @returns
  * @memberof ClassController
  */
   static deleteTeacherClass(req, res) {
     const { id } = req.params;
 
     return TeacherClasses.findById(id).then((foundClass) => {
       if (foundClass) {
         return foundClass.destroy().then(() => res.status(200).send({
           message: 'Class Deleted',
         }));
       }
       return res.status(400).send({
         message: 'Class does not exist',
       });
     }).catch(error => res.status(500).send({
       message: error.message,
     }));
   }
}
