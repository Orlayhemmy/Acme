
export default class LessonNoteController {
  /**
   * 
   * 
   * @static  createLessonNote
   * @param {any} req 
   * @param {any} res 
   * @memberof ClassController
   */
    static createLessonNote(req, res) {
      const { termId, weekId, classId, subjectId, content } = req.body;
  
      LessonNote.create({
        termId,
        weekId,
        classId,
        subjectId,
        content
      }).then(() => {
        return res.status(201).send({
        message: 'Lesson note saved successfully'
        });
      }).catch(error => {
        return res.status(500).send({
          message: error.message,
        });
      });
    }
  /**
   * 
   * 
   * @static updateLessonNote
   * @param {any} req 
   * @param {any} res 
   * @memberof ClassController
   */
    static updateLessonNote(req, res) {
      const { termId, weekId, classId, subjectId, content } = req.body;
      
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
  /**
   * 
   * 
   * @static getAllClasses
   * @param {any} req 
   * @param {any} res 
   * @memberof ClassController
   */
    static getAllClasses(req, res) {
      Class.findAll().then((classes) => {
        if (classes) {
          // show classes
          return res.status(200).send({
            classes,
          });
        }
        // No class found
        return res.status(404).send({
          message: 'There are no registered classes',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }
  /**
   * 
   * 
   * @staticgetSingleClass
   * @param {any} req 
   * @param {any} res 
   * @memberof ClassController
   */
    static getSingleClass(req, res) {
      Class.findOne({
        where: {
          class_id: req.params.class_id,
        },
      }).then((foundClass) => {
          if (foundClass) {
            return res.status(200).send({
              foundClass,
            });
          }
          return res.status(400).send({
            message: 'Class not found',
          });
        }).catch(error => res.status(500).send({
          message: error.message,
        }));
    }
  }