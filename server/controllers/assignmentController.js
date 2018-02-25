import models from '../models';

const { Assignment, Class } = models;

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
    const { termId, weekId, classId, staffId, topic } = req.body;
    return Assignment.create({
      termId,
      weekId,
      classId,
      staffId,
      topic,
    }).then(assignment => res.status(201).send({
      message: 'Assignment created',
      assignmentId: assignment.assignmentId,
    })).catch(error => res.status(500).send({
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
      content, upload, topic,
    } = req.body;
    const { id } = req.params;
    Assignment.findById(id).then((assignment) => {
      if (assignment) {
        assignment.update({
          content: content || assignment.content,
          upload: upload || assignment.upload,
          topic: topic || assignment.topic,
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
      }]
    }).then((assignment) => {
      if (assignment) {
        return res.status(200).send({
          assignment,
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
        return Assignment.destroy().then(() => res.status(200).send({
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
