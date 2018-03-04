import models from '../models';

const { Subjects } = models;

export default class SubjectController {
/**
 * 
 * 
 * @static  createSubject
 * @param {any} req 
 * @param {any} res 
 * @memberof SubjectController
 */
  static createSubject(req, res) {
    const { subjectname } = req.body;

    Subjects.create({
      subjectname,
    }).then(() => {
      return res.status(201).send({
      message: 'Subject created'
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
 * @static updateSubject
 * @param {any} req 
 * @param {any} res 
 * @memberof SubjectController
 */
  static updateSubjectInfo(req, res) {
    const { subjectname } = req.body;
    
    Subjects.findOne({
      where: {
        id: req.params.id,
      },
    }).then((foundSubject) => {
      if (foundSubject) {
        Subjects.update({
          subjectname: subjectname || foundSubjects.subjectname,
        }).then(() => res.status(200).send({
          message: 'Your information has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Subject not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }
/**
 * 
 * 
 * @static getAllSubjects
 * @param {any} req 
 * @param {any} res 
 * @memberof SubjectController
 */
  static getAllSubjects(req, res) {
    Subjects.findAll().then((subjects) => {
      if (subjects) {
        // show subjects
        return res.status(200).send({
          subjects,
        });
      }
      // No subject found
      return res.status(404).send({
        message: 'There are no registered subjects',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
/**
 * 
 * 
 * @staticgetSingleSubject
 * @param {any} req 
 * @param {any} res 
 * @memberof SubjectController
 */
  static getSingleSubject(req, res) {
    Subjects.findOne({
      where: {
        subject_id: req.params.subject_id,
      },
    }).then((foundSubject) => {
        if (foundSubject) {
          return res.status(200).send({
            foundSubject,
          });
        }
        return res.status(400).send({
          message: 'Subject not found',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
  }
/**
 * 
 * 
 * @static deleteSubject
 * @param {any} req 
 * @param {any} res 
 * @returns 
 * @memberof SubjectController
 */
  static deleteSubject(req, res) {
    const { id } = req.params;

    return Subjects.findById(id).then((foundSubject) => {
      if (foundSubject) {
        return Subjects.destroy().then(() => res.status(200).send({
          message: 'Subject Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Subject does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getTeacherSubjects(req, res) {
    const { id } = req.params;

    TeacherSubjects.findAll({
      where: {
        staffId: id,
      },
      include: [{
        model: Subject,
      }],
    }).then((subjects) => {
      if (subjects) {
        return res.status(200).send({
          subjects,
        });
      }
      return res.status(400).send({
        message: 'You have not registered subjects yet',
      });
    }).catch((error) => {
      res.status(500).send({
        message: error.message,
      });
    });
  }
}