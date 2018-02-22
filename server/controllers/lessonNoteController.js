import models from '../models';

const { LessonNote } = models;

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
    const { termId, weekId, classId, staffId } = req.body;
    return LessonNote.create({
      termId,
      weekId,
      classId,
      staffId,
    }).then((note) => res.status(201).send({
      message: 'Lesson note saved successfully',
      noteId: note.noteId,
    })).catch(error => res.status(500).send({
      message: error.message,
    }));
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
    const {
      content, activity, duration, objectives, materials, behaviours,
      assessment, scope, topic, questions, reference, strategies,
    } = req.body;

    LessonNote.findOne({
      where: {
        noteId: req.params.id,
      },
    }).then((note) => {
      if (note) {
        return LessonNote.update({
          content: content || note.content,
          activity: activity || note.activity,
          duration: duration || note.duration,
          objectives: objectives || note.objectives,
          materials: materials || note.materials,
          behaviours: behaviours || note.behaviours,
          assessment: assessment || note.assessment,
          scope: scope || note.scope,
          topic: topic || note.topic,
          questions: questions || note.questions,
          reference: reference || note.reference,
          strategies: strategies || note.strategies,
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
    const { staffId } = req.body;
    LessonNote.findAll({
      where: {
        staffId,
      },
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
      }
      return res.status(400).send({
        message: 'Lesson note not found',
      });

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
