import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Question, Class } = models;

export default class QuestionController {
  /**
   *
   *
   * @static  createQuestion
   * @param {any} req
   * @param {any} res
   * @memberof QuestionController
   */
  static createQuestion(req, res) {
    const { answer, opt_a, opt_b, opt_c, opt_d, testId, content, point } = req.body;
    return Question.create({
      answer,
      opt_a,
      opt_b,
      opt_c,
      opt_d,
      testId,
      content,
      point,
    }).then(() => res.status(201).send({
      message: 'Question created',
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
   *
   *
   * @static updateQuestion
   * @param {any} req
   * @param {any} res
   * @memberof QuestionController
   */
  static updateQuestion(req, res) {
    const { answer, opt_a, opt_b, opt_c, opt_d, content, point } = req.body;
    const { id } = req.params;
    Question.findById(id).then((question) => {
      if (question) {
        question.update({
          answer: answer || question.answer,
          content: content || question.content,
          opt_a: opt_a || question.opt_a,
          opt_b: opt_b || question.opt_b,
          opt_c: opt_c || question.opt_c,
          opt_d: opt_d || question.opt_d,
          point: point || question.point,
        }).then(() => res.status(200).send({
          message: 'Your Question has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Question not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }

 /**
   *
   *
   * @static getClassQuestions
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static getClassQuestions(req, res) {
    
    Question.findAll({
      where: {
        classId: req.params.id,
      },
      include: [{
        model: Class,
      }],
    }).then((questions) => {
      if (questions) {
        // show question
        return res.status(200).send({
          questions,
        });
      }
      // No Question found
      return res.status(404).send({
        message: 'No Question found',
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
   * @memberof QuestionController
   */
  static getTestQuestions(req, res) {
    Question.findAll({
      where: {
        testId: req.params.id,
      },
      order: [['createdAt', 'DESC']],
    }).then((content) => {
      if (content) {
        const payload = {
          content,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          token,
        });
      }
      // No Question found
      return res.status(404).send({
        message: 'No Question found',
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
   * @static getSingleQuestion
   * @param {any} req
   * @param {any} res
   * @memberof QuestionController
   */
  static getSingleQuestion(req, res) {
    const { id } = req.params;
    Question.findOne({
      where: {
        questionId: id,
      },
    }).then((question) => {
      if (question) {
        const payload = {
          content: question.content,
          opt_a: question.opt_a,
          opt_b: question.opt_b,
          opt_c: question.opt_c,
          opt_d: question.opt_d,
          answer: question.answer,
          id: question.questionId,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          message: 'Question Found',
          token,
        });
      }
      return res.status(400).send({
        message: 'Question not found',
      });

    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
   *
   *
   * @static deletequestion
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof QuestionController
   */
  static deleteQuestion(req, res) {
    const { id } = req.params;

    return Question.findById(id).then((question) => {
      if (question) {
        return question.destroy().then(() => res.status(200).send({
          message: 'Question Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Question does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

}
