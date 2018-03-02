import jwt from 'jsonwebtoken';
import env from 'dotenv';
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
    const { assignmentId } = req.body;
    return Feedback.create({
      assignmentId,
      studentId: req.decoded.id,
    }).then((feedback) => {
      const payload = {
        id: feedback.feedbackId,
        assignmentId: feedback.assignmentId,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 60 * 60 * 12,
      });
      req.body.token = token;
      return res.status(201).send({
        message: 'Feedback created',
        token,
      });
    }).catch(error => res.status(500).send({
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
    const { content, upload } = req.body;
    const { id } = req.params;
    Feedback.findById(id).then((feedback) => {
      if (feedback) {
        feedback.update({
          content: content || feedback.content,
          upload: upload || feedback.upload,
        }).then(() => {
          // const payload = {
          //   id: feedback.feedbackId,
          // };
          // const token = jwt.sign(payload, process.env.SECRET, {
          //   expiresIn: 60 * 60 * 12,
          // });
          // req.body.token = token;
          return res.status(200).send({
            message: 'Your response has been updated successfully',
          });
        }).catch(err => res.status(500).send({
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
      order: [['createdAt', 'DESC']],
    }).then((feedbacks) => {
      if (feedbacks) {
        // show feedback
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
  static getFeedback(req, res) {
    const { id } = req.params;
    Feedback.findOne({
      where: {
        assignmentId: id,
        studentId: req.decoded.id,
      },
    }).then((feedback) => {
      if (feedback) {
        const payload = {
          id: feedback.feedbackId,
          assignmentId: feedback.assignmentId,
          content: feedback.content,
          upload: feedback.upload,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          token,
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
   * @static deletefeedback
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof FeedbackController
   */
  static deleteFeedback(req, res) {
    const { id } = req.params;

    return Feedback.findById(id).then((feedback) => {
      if (feedback) {
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
