import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default class Validation {

  static modifyNote(req, res, next) {
    const {
      content, activity, duration, objectives, materials, behaviours,
      assessment, scope, topic, questions, reference, strategies,
    } = req.body;

    const errors = {};

    if (content === undefined) {
      return res.status(400).send({
        message: 'All or some fields are not defined',
      });
    }

    if (validator.isEmpty(activity)) {
      errors.activity = 'Class activity cannot be blank';
    }
    if (validator.isEmpty(duration)) {
      errors.duration = 'Set duration for class';
    }
    if (validator.isEmpty(objectives)) {
      errors.objectives = 'What are the objectives to be achieved';
    }
    if (validator.isEmpty(materials)) {
      errors.materials = 'List the instructional materials to be used';
    }
    if (validator.isEmpty(behaviours)) {
      errors.behaviours = 'Entry behaviour cannot be blank';
    }
    if (validator.isEmpty(content)) {
      errors.content = 'Content cannot be blank';
    }
    if (validator.isEmpty(assessment)) {
      errors.assessment = 'assessment cannot be blank';
    }
    if (validator.isEmpty(scope)) {
      errors.scope = 'Define the scope of work';
    }
    if (validator.isEmpty(topic)) {
      errors.topic = 'Leson note must have a topic';
    }
    if (validator.isEmpty(questions)) {
      errors.questions = 'questions cannot be blank';
    }
    if (validator.isEmpty(reference)) {
      errors.reference = 'Outline references used';
    }
    if (validator.isEmpty(strategies)) {
      errors.strategies = 'list out teaching strategies to be used';
    }

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
 
  }

  static createNote(req, res, next) {
    const { weekId, classId, topic } = req.body;
    const errors = {}

    if (weekId == '') {
      errors.weekId = 'Select a week';
    }
    if (classId == '') {
      errors.classId = 'Select a class';
    }

    if (topic == '') {
      errors.classId = 'The note must have a topic';
    }   

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
  }
}
