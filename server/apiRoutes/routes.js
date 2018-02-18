import express from 'express';
import StudentController from '../controllers/studentcontroller';
import StaffController from '../controllers/staffcontroller';
import LessonNoteController from '../controllers/lessonNoteController';
import ClassController from '../controllers/classController';
import AuthToken from '../middleware/authenticateToken';
import AuthAdminToken from '../middleware/authAdminToken';
import StudentValidate from '../middleware/studentValidate';
import StaffValidate from '../middleware/staffValidate';
import ClassValidate from '../middleware/classValidate';

const router = express.router();

router.route('/student')
  .post(StudentValidate.signup, StudentController.signup);

router.route('/student/login')
  .post(StudentValidate.signin, StudentController.signin);

router.route('/student/:id')
  .get(AuthToken, StudentController.getSingleStudent)
  .put(AuthToken, StudentValidate.updateStudentInfo, StudentController.updateStudentInfo);

router.route('/classStudents/:id')
  .get(AuthToken, StudentController.getClassStudents);

router.route('/studentPasswordRecovery')
  .post(StudentController.recoverPassword);

route.route('/staff')
  .post(StaffValidate.signup, StaffController.signup);

router.route('/staff/login')
  .post(StaffValidate.signin, StaffController.signin);

router.route('/staff/:id')
  .get(AuthToken, StaffController.getSingleStaff)
  .put(AuthToken, StaffValidate.updateStaffInfo, StaffController.updateStaffInfo);

router.route('/staffPasswordRecovery')
  .post(StaffController.recoverPassword);

router.route('/class')
  .post(AuthAdminToken, ClassValidate.createClass, ClassController.createClass)
  .get(AuthToken, ClassController.getAllClasses);

router.route('/class/:id')
  .put(AuthToken, ClassValidate.updateClass, ClassController.updateClassInfo)
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
