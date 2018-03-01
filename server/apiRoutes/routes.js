import express from 'express';
import StudentController from '../controllers/studentcontroller';
import StaffController from '../controllers/staffcontroller';
import LessonNoteController from '../controllers/lessonNoteController';
import ClassController from '../controllers/classController';
import AssignmentController from '../controllers/assignmentController';
import FeedbackController from '../controllers/feedbackController';
import WeekController from '../controllers/weekController';
import TermController from '../controllers/termController';
import TestController from '../controllers/testControllers';
import QuestionController from '../controllers/questionControllers';
import ActivityController from '../controllers/activityController';
import AuthToken from '../middleware/authenticateToken';
import AuthAdminToken from '../middleware/authAdminToken';
import StudentValidate from '../middleware/studentValidate';
import StaffValidate from '../middleware/staffValidate';
import ClassValidate from '../middleware/classValidate';
import NoteValidate from '../middleware/noteValidate';
import AssignmentValidate from '../middleware/assignmentValidate';

const router = express.Router();

router.route('/students')
  .post(StudentValidate.signup, StudentController.signup);

router.route('/students/login')
  .post(StudentValidate.signin, StudentController.signin);

router.route('/student/:id')
  .get(AuthToken, StudentController.getSingleStudent)
  .put(AuthToken, StudentValidate.updateStudentInfo, StudentController.updateStudentInfo);

router.route('/classStudents/:id')
  .get(AuthToken, StudentController.getClassStudents);

router.route('/studentPasswordRecovery')
  .post(StudentController.recoverPassword);

router.route('/staffs')
  .post(StaffValidate.signup, StaffController.signup);

router.route('/staffs/login')
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

router.route('/classes/:id')
  .get(AuthToken, ClassController.getTeacherClasses);

router.route('/notes')
  .post(AuthToken, NoteValidate.createNote, LessonNoteController.createLessonNote);

router.route('/weeknotes/:id')
  .get(AuthToken, LessonNoteController.getWeekNotes);

router.route('/studentweeknotes/:id')
  .get(AuthToken, LessonNoteController.getStudentWeekNotes);

router.route('/hodweeknotes/:id')
  .get(AuthToken, LessonNoteController.getHODWeekNotes);

router.route('/studentnote/:id')
  .get(AuthToken, LessonNoteController.getStudentSingleLessonNote)

router.route('/note/:id')
  .put(AuthToken, LessonNoteController.updateLessonNote)
  .get(AuthToken, LessonNoteController.getSingleLessonNote)
  .delete(AuthToken, LessonNoteController.deleteNote);

router.route('/assignments')
  .post(AuthToken, AssignmentValidate.createAssignment, AssignmentController.createAssignment);

router.route('/weekassignments/:id')
  .get(AuthToken, AssignmentController.getWeekAssignments);

router.route('/studentweekassignments/:id')
  .get(AuthToken, AssignmentController.getStudentWeekAssignments);

router.route('/studentassignment/:id')
  .get(AuthToken, AssignmentController.getStudentSingleAssignment);

router.route('/assignment/:id')
  .put(AuthToken, AssignmentController.updateAssignment)
  .get(AuthToken, AssignmentController.getSingleAssignment)
  .delete(AuthToken, AssignmentController.deleteAssignment);

router.route('/feedbacks')
  .post(AuthToken, FeedbackController.createFeedback);

router.route('/weekfeedbacks/:id')
  .get(AuthToken, FeedbackController.getWeekFeedbacks);

router.route('/feedback/:id')
  .put(AuthToken, FeedbackController.updateFeedback)
  .get(AuthToken, FeedbackController.getFeedback)
  .delete(AuthToken, FeedbackController.deleteFeedback);

router.route('/term')
  .get(TermController.getTerm);

router.route('/term/:id')
  .put(AuthToken, TermController.currentTerm);

router.route('/week')
  .get(WeekController.getWeek);

router.route('/week/:id')
  .put(AuthToken, WeekController.currentWeek);

router.route('/tests')
  .post(AuthToken, TestController.createTest);

router.route('/termtests/:id')
  .get(AuthToken, TestController.getTermTests);

router.route('/test/:id')
  .put(AuthToken, TestController.updateTest)
  .get(AuthToken, TestController.getSingleTest)
  .delete(AuthToken, TestController.deleteTest);

router.route('/questions')
  .post(AuthToken, QuestionController.createQuestion);

router.route('/testquestions/:id')
  .get(AuthToken, QuestionController.getTestQuestions);

router.route('/question/:id')
  .put(AuthToken, QuestionController.updateQuestion)
  .get(AuthToken, QuestionController.getSingleQuestion)
  .delete(AuthToken, QuestionController.deleteQuestion);

router.route('/activities')
  .post(AuthToken, ActivityController.createActivity)
  .get(AuthToken, ActivityController.getAllActivities);

router.route('/studentactivities')
  .post(AuthToken, ActivityController.createStudentActivity)
  .get(AuthToken, ActivityController.getStudentActivities);

router.route('/activity/:id')
  .delete(ActivityController.deleteActivity);

router.route('/studentactivity/:id')
  .delete(ActivityController.deleteStudentActivity);

export default router;
