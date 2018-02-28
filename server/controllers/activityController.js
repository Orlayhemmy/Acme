import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

const { Activity, Class } = models;

export default class ActivityController {
  /**
   *
   *
   * @static  createActivity
   * @param {any} req
   * @param {any} res
   * @memberof ActivityController
   */
  static createActivity(req, res) {
    const { description } = req.body;
    return Activity.create({
      description,
    }).then(() => {
      return res.status(201).send({
        message: 'Activity created',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  /**
   *
   *
   * @static getAll
   * @param {any} req
   * @param {any} res
   * @memberof ActivityController
   */
  static getAllActivities(req, res) {
    Activity.findAll({
      where: {
        staffId: req.decoded.id,
      },
    }).then((activities) => {
      if (activities) {
        // show activity
        return res.status(200).send({
          activities,
        });
      }
      // No Activity found
      return res.status(404).send({
        message: 'No Activity found',
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
   * @static deleteactivity
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof ActivityController
   */
  static deleteActivity(req, res) {
    const { id } = req.params;

    return Activity.findById(id).then((activity) => {
      if (activity) {
        return activity.destroy().then(() => res.status(200).send({
          message: 'Activity Deleted',
        }));
      }
      return res.status(400).send({
        message: 'Activity does not exist',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

}
