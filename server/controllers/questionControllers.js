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
    const { termId, classId, staffId, title } = req.body;
    return Question.create({
      termId,
      classId,
      staffId,
      title,
    }).then(question => res.status(201).send({
      message: 'Question created',
      questionId: question.questionId,
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
    const {
      upload, title, duration, intro,
    } = req.body;
    const { id } = req.params;
    Question.findById(id).then((question) => {
      if (question) {
        question.update({
          intro: intro || question.intro,
          upload: upload || question.upload,
          duration: duration || question.duration,
          title: title || question.title,
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
      include: [{
        model: Class,
      }]
    }).then((question) => {
      if (question) {
        const payload = {
          termId: question.termId,
          classname: question.Class.classname,
          intro: question.intro,
          title: question.title,
          duration: question.duration,
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
        return Question.destroy().then(() => res.status(200).send({
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
