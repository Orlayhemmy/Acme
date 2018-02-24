import models from '../models';

const { Feedback, Students } = models;

export default class FeedbackController {
  /**
   *
   *
   * @static  createFeedback
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static createFeedback(req, res) {
    const { termId, weekId, classId, studentId } = req.body;
    return Feedback.create({
      termId,
      weekId,
      classId,
      studentId,
    }).then(assess => res.status(201).send({
      message: 'Feedback created',
      assignmentId: assess.assignmentId,
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
   *
   *
   * @static updateFeedback
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static updateFeedback(req, res) {
    const {
      content, upload,
    } = req.body;
    const { id } = req.params;
    Feedback.findById(id).then((assess) => {
      if (assess) {
        assess.update({
          content: content || assess.content,
          upload: upload || assess.upload,
        }).then(() => res.status(200).send({
          message: 'Your Feedback has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Feedback not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }

  
  /**
   *
   *
   * @static getAll
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static getWeekFeedbacks(req, res) {
    
    Feedback.findAll({
      where: {
        assignmentId: req.params.assignmentId,
      },
      include: [{
        model: Students,
      }],
    }).then((feedbacks) => {
      if (feedbacks) {
        // show assess
        return res.status(200).send({
          feedbacks,
        });
      }
      // No Feedback found
      return res.status(404).send({
        message: 'No Feedback found',
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
   * @static getSingleFeedback
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static getSingleFeedback(req, res) {
    const { id } = req.params;
    Feedback.findOne({
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
        message: 'Feedback not found',
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
   * @memberof FeedbackController
   */
  static deleteFeedback(req, res) {
    const { id } = req.params;

    return Feedback.findById(id).then((assess) => {
      if (assess) {
        return Feedback.destroy().then(() => res.status(200).send({
          message: 'Feedback Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Feedback does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

}
