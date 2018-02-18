import express from 'express';
import StudentController from '../controllers/studentcontroller';
import StaffController from '../controllers/staffcontroller';
import LessonNoteController from '../controllers/lessonNoteController';
import ClassController from '../controllers/classController';

const router = express.router();

router.route('/student')
  .post(StudentController.signup);

router.route('/student/login')
  .post(StudentController.signin);

router.route('/student/:id')
  .get(StudentController.getSingleStudent)
  .put(StudentController.updateStudentInfo);

router.route('/classStudents/:id')
  .get(StudentController.getClassStudents);

router.route('/studentPasswordRecovery')
  .post(StudentController.recoverPassword);

route.route('/staff')
  .post(StaffController.signup);

router.route('/staff/login')
  .post(StaffController.signin);

router.route('/staff/:id')
  .get(StaffController.getSingleStaff)
  .put(StaffController.updateStaffInfo);

router.route('/staffPasswordRecovery')
  .post(StaffController.recoverPassword);

router.route('/class')
  .post(ClassController.createClass)
  .get(ClassController.getAllClasses);

router.route('/class/:id')
  .put(ClassController.updateClassInfo)
  .get(ClassController.getSingleClass)
  .delete(ClassController.deleteClass);

router.route('/note')
  .post(LessonNoteController.createLessonNote)
  .get(LessonNoteController.getAllNotes);

router.route('/note/:id')
  .put(LessonNoteController.updateLessonNote)
  .get(LessonNoteController.getSingleLessonNote)
  .delete(LessonNoteController.deleteNote);

export default router;
