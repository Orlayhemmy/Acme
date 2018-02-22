import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function createNoteValidate(data) {
  const { classId, weekId } = data;
  const errors = {};

  if (validator.isEmpty(classId)) {
    errors.classId = 'Select a class';
  }

  if (validator.isEmpty(weekId)) {
    errors.weekId = 'Select a week';
  }

  return { errors, isValid: isEmpty(errors) };
}

export function writeNoteValidate(data) {
  const { duration, objectives, activity, materials, behaviours, content, assessment,
    scope, topic, questions, reference, strategies } = data;

    const errors = {};

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
  return { errors, isValid: isEmpty(errors) };
}
