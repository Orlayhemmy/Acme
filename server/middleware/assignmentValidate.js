import isEmpty from 'lodash/isEmpty';

export default class Validation {

  static createAssignment(req, res, next) {
    const { weekId, classId, topic } = req.body;
    const errors = {}

    if (isEmpty(weekId)) {
      errors.weekId = 'Select a week';
    }
    if (isEmpty(classId)) {
      errors.classId = 'Select a class';
    }

    if (isEmpty(topic)) {
      errors.topic = 'Give assignment a topic';
    }

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
  }
}