import { Class } from '../models';

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
    const { classname, class_id } = req.body;

    Class.create({
      classname,
      class_id,
    }).then(() => {
      return res.status(201).send({
      message: 'Class created'
      });
    }).catch(error => {
      return res.status(500).send({
        message: error.message,
      });
    });
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
    const { class_id, classname, tutor_id } = req.body;
    
    Class.findOne({
      where: {
        class_id,
      },
    }).then((foundClass) => {
      if (foundClass) {
        Class.update({
          classname: classname || foundClass.classname,
          tutor_id: tutor_id || foundClass.tutor_id,
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
  static getSingleClass(req, res) {
    Class.findOne({
      where: {
        class_id: req.params.class_id,
      },
    }).then((foundClass) => {
        if (foundClass) {
          return res.status(200).send({
            foundClass,
          });
        }
        return res.status(400).send({
          message: 'Class not found',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
  }
}