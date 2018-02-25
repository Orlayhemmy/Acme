import models from '../models';

const { Term } = models;

export default class TermController {

/**
 * 
 * 
 * @static updateTerm
 * @param {any} req 
 * @param {any} res 
 * @memberof TermController
 */
  static currentTerm(req, res) {
    const { id } = req.params;
    Term.findOne({
      where: {
        current: true,
      }
    }).then((term) => {
      if (term) {
        term.update({
          current: false,
        });
      }
    });
    Term.findOne({
      where: {
        termId: id,
      },
    }).then((foundTerm) => {
      if (foundTerm) {
        foundTerm.update({
          current: true,
        }).then(() => res.status(200).send({
          message: 'Current term is set',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }

  /**
   *
   *
   * @static getTerm
   * @param {any} req
   * @param {any} res
   * @memberof TermController
   */
  static getTerm(req, res) {
    Term.findOne({
      where: {
        current: true,
      },
    }).then((term) => {
      if (term) {
        return res.status(200).send({
          id: term.termId,
        });
      }
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
}