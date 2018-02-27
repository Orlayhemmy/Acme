import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Test, Class } = models;

export default class TestController {
  /**
   *
   *
   * @static  createTest
   * @param {any} req
   * @param {any} res
   * @memberof TestController
   */
  static createTest(req, res) {
    const { termId, classId, staffId, title } = req.body;
    return Test.create({
      termId,
      classId,
      staffId,
      title,
    }).then((test) => {
      const payload = {
        termId: test.termId,
        intro: test.intro,
        title: test.title,
        duration: test.duration,
        id: test.testId,
      }
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 60 * 60 * 12,
      });
      req.body.token = token;
      return res.status(201).send({
        message: 'Test created',
        testId: test.testId,
        token,
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
   *
   *
   * @static updateTest
   * @param {any} req
   * @param {any} res
   * @memberof TestController
   */
  static updateTest(req, res) {
    const {
      upload, title, duration, intro,
    } = req.body;
    const { id } = req.params;
    Test.findById(id).then((test) => {
      if (test) {
        test.update({
          intro: intro || test.intro,
          upload: upload || test.upload,
          duration: duration || test.duration,
          title: title || test.title,
        }).then(() => res.status(200).send({
          message: 'Your Test has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Test not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }

 /**
   *
   *
   * @static getClassTests
   * @param {any} req
   * @param {any} res
   * @memberof FeedbackController
   */
  static getClassTests(req, res) {
    
    Test.findAll({
      where: {
        classId: req.params.id,
      },
      include: [{
        model: Class,
      }],
    }).then((tests) => {
      if (tests) {
        // show test
        return res.status(200).send({
          tests,
        });
      }
      // No Test found
      return res.status(404).send({
        message: 'No Test found',
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
   * @memberof TestController
   */
  static getTermTests(req, res) {
    Test.findAll({
      where: {
        staffId: req.decoded.id,
        termId: req.params.id,
      },
      include: [{
        model: Class,
      }],
    }).then((tests) => {
      if (tests) {
        // show test
        return res.status(200).send({
          tests,
        });
      }
      // No Test found
      return res.status(404).send({
        message: 'No Test found',
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
   * @static getSingleTest
   * @param {any} req
   * @param {any} res
   * @memberof TestController
   */
  static getSingleTest(req, res) {
    const { id } = req.params;
    Test.findOne({
      where: {
        testId: id,
      },
      include: [{
        model: Class,
      }]
    }).then((test) => {
      if (test) {
        const payload = {
          termId: test.termId,
          classname: test.Class.classname,
          intro: test.intro,
          title: test.title,
          duration: test.duration,
          id: test.testId,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          message: 'Test Found',
          token,
        });
      }
      return res.status(400).send({
        message: 'Test not found',
      });

    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
   *
   *
   * @static deletetest
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof TestController
   */
  static deleteTest(req, res) {
    const { id } = req.params;

    return Test.findById(id).then((test) => {
      if (test) {
        return Test.destroy().then(() => res.status(200).send({
          message: 'Test Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Test does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

}
