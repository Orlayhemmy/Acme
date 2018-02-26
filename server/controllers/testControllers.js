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
    }).then(test => res.status(201).send({
      message: 'Test created',
      testId: test.testId,
    })).catch(error => res.status(500).send({
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
      content, upload, topic,
    } = req.body;
    const { id } = req.params;
    Test.findById(id).then((test) => {
      if (test) {
        test.update({
          content: content || test.content,
          upload: upload || test.upload,
          topic: topic || test.topic,
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
        return res.status(200).send({
          test,
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
