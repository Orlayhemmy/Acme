import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Assignment, Class, Subjects } = models;

export default class AssignmentController {
  /**
   *
   *
   * @static  createAssignment
   * @param {any} req
   * @param {any} res
   * @memberof AssignmentController
   */
  static createAssignment(req, res) {
    const { termId, weekId, classId, topic } = req.body;
    return Assignment.create({
      termId,
      weekId,
      classId,
      staffId: req.decoded.id,
      topic,
      subjectId: req.decoded.subjectId,
    }).then((assignment) => {
      const payload = {
        termId: assignment.termId,
        weekId: assignment.weekId,
        topic: assignment.topic,
        id: assignment.assignmentId,
      }
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 60 * 60 * 12,
      });
      req.body.token = token;
      return res.status(201).send({
        message: 'Assignment created',
        token,
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
   *
   *
   * @static updateAssignment
   * @param {any} req
   * @param {any} res
   * @memberof AssignmentController
   */
  static updateAssignment(req, res) {
    const {
      content, upload, topic, preview,
    } = req.body;
    const { id } = req.params;
    Assignment.findById(id).then((assignment) => {
      if (assignment) {
        assignment.update({
          content: content || assignment.content,
          upload,
          topic: topic || assignment.topic,
          preview: preview || assignment.preview,
        }).then(() => res.status(200).send({
          message: 'Your Assignment has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Assignment not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }

 /**
   *
   *
   * @static getClassAssignments
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static getClassAssignments(req, res) {
    
    Assignment.findAll({
      where: {
        classId: req.params.id,
        weekId: req.params.id,
      },
      include: [{
        model: Class,
      }],
      order: [['createdAt', 'DESC']],
    }).then((assignments) => {
      if (assignments) {
        // show assignment
        return res.status(200).send({
          assignments,
        });
      }
      // No Assignment found
      return res.status(404).send({
        message: 'No Assignment found',
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
   * @static getAll
   * @param {any} req
   * @param {any} res
   * @memberof AssignmentController
   */
  static getWeekAssignments(req, res) {
    
    Assignment.findAll({
      where: {
        staffId: req.decoded.id,
        weekId: req.params.id,
      },
      include: [{
        model: Class,
      }],
      order: [['createdAt', 'DESC']],
    }).then((assignments) => {
      if (assignments) {
        // show assignment
        return res.status(200).send({
          assignments,
        });
      }
      // No Assignment found
      return res.status(404).send({
        message: 'No Assignment found',
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
   * @static getAllAssignment
   * @param {any} req
   * @param {any} res
   * @memberof AssignmentController
   */
  static getStudentWeekAssignments(req, res) {
    
    Assignment.findAll({
      where: {
        weekId: req.params.id,
        upload: true,
        classId: req.decoded.classId,
      },
      include: [{
        model: Subjects,
      }],
      order: [['createdAt', 'DESC']],
    }).then((assignments) => {
      if (assignments) {
        // show assignment
        return res.status(200).send({
          assignments,
        });
      }
      // No Assignment found
      return res.status(404).send({
        message: 'No Assignment found',
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
   * @static getSingleAssignment
   * @param {any} req
   * @param {any} res
   * @memberof AssignmentController
   */
  static getSingleAssignment(req, res) {
    const { id } = req.params;
    Assignment.findOne({
      where: {
        assignmentId: id,
      },
      include: [{
        model: Class,
      }],
    }).then((assignment) => {
      if (assignment) {
        const payload = {
          content: assignment.content,
          topic: assignment.topic,
          classname: assignment.Class.classname,
          termId: assignment.termId,
          weekId: assignment.weekId,
          id: assignment.assignmentId,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          token,
          message: 'Assignment found',
        });
      }
      return res.status(400).send({
        message: 'Assignment not found',
      });

    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

/**
   *
   *
   * @static getSingleAssignment
   * @param {any} req
   * @param {any} res
   * @memberof AssignmentController
   */
  static getStudentSingleAssignment(req, res) {
    const { id } = req.params;
    Assignment.findOne({
      where: {
        assignmentId: id,
        upload: true,
      },
      include: [{
        model: Class,
      },
      {
        model: Subjects,
      }],
    }).then((assignment) => {
      if (assignment) {
        const payload = {
          content: assignment.content,
          topic: assignment.topic,
          classname: assignment.Class.classname,
          termId: assignment.termId,
          weekId: assignment.weekId,
          id: assignment.assignmentId,
          subjectname: assignment.Subject.subjectname,
          subjectId: assignment.Subject.subjectId,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          token,
          message: 'Assignment found',
        });
      }
      return res.status(400).send({
        message: 'Assignment not found',
      });

    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  /**
   *
   *
   * @static deleteassignment
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof AssignmentController
   */
  static deleteAssignment(req, res) {
    const { id } = req.params;

    return Assignment.findById(id).then((assignment) => {
      if (assignment) {
        return assignment.destroy().then(() => res.status(200).send({
          message: 'Assignment Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Assignment does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

}
