import express from 'express';
import StudentController from '../controllers/studentcontroller';
import StaffController from '../controllers/staffcontroller';
import LessonNoteController from '../controllers/lessonNoteController';
import ClassController from '../controllers/classController';
import AuthToken from '../middleware/authenticateToken';
import AuthAdminToken from '../middleware/authAdminToken';

const router = express.router();

router.route('/student')
  .post(StudentController.signup);

router.route('/student/login')
  .post(StudentController.signin);

router.route('/student/:id')
  .get(AuthToken, StudentController.getSingleStudent)
  .put(AuthToken, StudentController.updateStudentInfo);

router.route('/classStudents/:id')
  .get(AuthToken, StudentController.getClassStudents);

router.route('/studentPasswordRecovery')
  .post(StudentController.recoverPassword);

route.route('/staff')
  .post(StaffController.signup);

router.route('/staff/login')
  .post(StaffController.signin);

router.route('/staff/:id')
  .get(AuthToken, StaffController.getSingleStaff)
  .put(AuthToken, StaffController.updateStaffInfo);

router.route('/staffPasswordRecovery')
  .post(StaffController.recoverPassword);

router.route('/class')
  .post(AuthAdminToken, ClassController.createClass)
  .get(AuthToken, ClassController.getAllClasses);

router.route('/class/:id')
  .put(AuthToken, ClassController.updateClassInfo)
  .get(AuthToken, ClassController.getSingleClass)
  .delete(AuthAdminToken, ClassController.deleteClass);

router.route('/note')
  .post(AuthToken, LessonNoteController.createLessonNote)
  .get(AuthToken, LessonNoteController.getAllNotes);

router.route('/note/:id')
  .put(AuthToken, LessonNoteController.updateLessonNote)
  .get(AuthToken, LessonNoteController.getSingleLessonNote)
  .delete(AuthToken, LessonNoteController.deleteNote);

export default router;
