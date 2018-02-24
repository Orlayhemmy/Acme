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
    const { termId, weekId, classId, staffId } = req.body;
    return Assignment.create({
      termId,
      weekId,
      classId,
      staffId,
    }).then(assess => res.status(201).send({
      message: 'Assignment created',
      assignmentId: assess.assignmentId,
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
      content, upload,
    } = req.body;
    const { id } = req.params;
    Assignment.findById(id).then((assess) => {
      if (assess) {
        assess.update({
          content: content || assess.content,
          upload: upload || assess.upload,
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
    }).then((assess) => {
      if (assess) {
        // show assess
        return res.status(200).send({
          assess,
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
    }).then((assess) => {
      if (assess) {
        // show assess
        return res.status(200).send({
          assess,
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
    }).then((assess) => {
      if (assess) {
        return res.status(200).send({
          assess,
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
   * @static deleteassess
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof AssignmentController
   */
  static deleteAssignment(req, res) {
    const { id } = req.params;

    return Assignment.findById(id).then((assess) => {
      if (assess) {
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
