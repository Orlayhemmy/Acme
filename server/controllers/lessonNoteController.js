import { LessonNote } from '../models';

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
      
      LessonNote.findOne({
        where: {
          id: req.params.id,
        },
      }).then((note) => {
        if (note) {
          LessonNote.update({
            termId: termId || note.termId,
            weekId: weekId || note.weekId,
            classId: classId || note.classId,
            subjectId: subjectId || note.subjectId,
            content: content || note.content
          }).then(() => res.status(200).send({
            message: 'Your lesson note has been updated successfully',
          })).catch(err => res.status(500).send({
            message: err.message,
          }));
        } else {
          return res.status(400).send({
            message: 'lesson note not found',
          });
        }
      }).catch(err => res.status(500).send({
        message: err.message,
      }));
    }
  /**
   * 
   * 
   * @static getAllNotes
   * @param {any} req 
   * @param {any} res 
   * @memberof ClassController
   */
    static getAllNotes(req, res) {
      const { staff_id } = req.body;
      LessonNote.findAll({
        where: {
          staffId,
        }
      }).then((notes) => {
        if (notes) {
          // show notes
          return res.status(200).send({
            notes,
          });
        }
        // No lesson note found
        return res.status(404).send({
          message: 'No lesson not found',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }
  /**
   * 
   * 
   * @static getSingleLessonNote
   * @param {any} req 
   * @param {any} res 
   * @memberof ClassController
   */
    static getSingleLessonNote(req, res) {
      const { id } = req.params;
      LessonNote.findOne({
        where: {
          id,
        },
      }).then((note) => {
          if (note) {
            return res.status(200).send({
              note,
            });
          } else {
            return res.status(400).send({
              message: 'Lesson note not found',
            });
          }
        }).catch(error => res.status(500).send({
          message: error.message,
        }));
    }
  /**
   * 
   * 
   * @static deleteNote
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof LessonNoteController
   */
    static deleteNote(req, res) {
      const { id } = req.params;
  
      return LessonNote.findById(id).then((note) => {
        if (note) {
          return LessonNote.destroy().then(() => res.status(200).send({
            message: 'Note Deleted',
          }));
        }
        return res.status(400).send({
          message: 'Lesson note does not exist',
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
    }
    
  }