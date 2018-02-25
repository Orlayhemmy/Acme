import models from '../models';

const { Week } = models;

export default class WeekController {

/**
 * 
 * 
 * @static updateWeek
 * @param {any} req 
 * @param {any} res 
 * @memberof WeekController
 */
  static currentWeek(req, res) {
    const { id } = req.params;
    Week.findOne({
      where: {
        current: true,
      }
    }).then((week) => {
      if (week) {
        week.update({
          current: false,
        });
      }
    });
    Week.findOne({
      where: {
        weekId: id,
      },
    }).then((foundWeek) => {
      if (foundWeek) {
        foundWeek.update({
          current: true,
        }).then(() => res.status(200).send({
          message: 'Current week is set',
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
   * @static getWeek
   * @param {any} req
   * @param {any} res
   * @memberof WeekController
   */
  static getWeek(req, res) {
    Week.findOne({
      where: {
        current: true,
      },
    }).then((week) => {
      if (week) {
        return res.status(200).send({
          id: week.weekId,
        });
      }
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
}