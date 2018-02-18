import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default class Validation {

  static createNote(req, res, next){
    const { content } = req.body;

    const errors = {};

    if (content === undefined) {
      return res.status(400).send({
        message: 'All or some fields are not defined',
      });
    }
  
      next();
  }


}