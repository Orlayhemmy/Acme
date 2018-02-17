
export default class ClassController {

  static createClass(req, res) {
    const { classname, class_id } = req.body;

    Class.create({
      classname,
      class_id,
    }).then(() => {
      return res.status(201).send({
      message: 'Class created'
      });
    }).catch(error => {
      return res.status(500).send({
        message: error.message,
      });
    });
  }

  static updateClassInfo(req, res) {
    const { class_id, classname, tutor_id } = req.body;
    
    Class.findOne({
      where: {
        class_id,
      },
    }).then((foundClass) => {
      if (foundClass) {
        Students.update({
          classname: classname || foundClass.classname,
          tutor_id: tutor_id || foundClass.tutor_id,
        }).then(() => res.status(200).send({
          message: 'Your information has been updated successfully',
        })).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'Class not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }
}