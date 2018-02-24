;

export default class Validation {

  static createAssignment(req, res, next) {
    const { weekId, classId } = req.body;
    const errors = {}

    if (weekId == '') {
      errors.weekId = 'Select a week';
    }
    if (classId == '') {
      errors.classId = 'Select a class';
    }

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return res.status(400).send(errors);
    }
    next();
  }
}