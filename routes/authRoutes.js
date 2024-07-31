const {Router} =  require('express');
const authController = require('../controllers/authController.js');
const questionController = require('../controllers/questionController.js');
const questionInstanceController = require('../controllers/questionInstanceController.js');
const checkAttemptController = require('../controllers/checkAttemptController.js');
const courseController = require('../controllers/courseController.js');
const adminController = require('../controllers/adminController.js');
const moduleController = require('../controllers/moduleController.js');
const modulePlayController = require('../controllers/modulePlayController.js');
const userController = require('../controllers/userController.js');
const feedbackFromStudentsController = require('../controllers/feedbackFromStudentsController.js');
const hierarchicalQuizController = require('../controllers/hierarchicalQuizController.js');

const router = Router();

router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login',authController.login_post);

router.get('/logout', authController.logout_get);

router.post('/changepassword', authController.changepassword_post);

router.post('/resetPassword', authController.resetpassword_post);

router.get('/changepassword', authController.changepassword_get);

router.get('/insertQuestion', questionController.insertQuestion_get);

router.post('/insertQuestion', questionController.insertQuestion_post);

router.get('/importZip', questionController.importZip_get);

router.post('/importZip', questionController.importZip_post);

router.get('/allQuestions', questionController.allQuestions_get);

router.delete('/questionDetails/:id', questionController.question_delete);

router.get('/questionDetails/:id', questionController.questionDetails_get);

router.post('/questionUpdateJson', questionController.questionUpdateJson_post);

router.post('/questionUpdateSolution', questionController.questionUpdateSolution_post);

router.post('/questionUpdateHTML', questionController.questionUpdateHTML_post);

router.get('/questionInstance/:id', questionInstanceController.questionInstance_create_get);

router.get('/showNextStep', questionInstanceController.showNextStep_get);

router.get('/showAnswer/:id', questionInstanceController.showAnswer_get);

router.get('/showHint/:id', questionInstanceController.showHint_get);

router.post('/checkAttempt', checkAttemptController.checkAttempt_post);

router.get('/admin', adminController.admin_get);

router.get('/courses', courseController.allCourses_get);

router.post('/addStudentsToCourse', courseController.addStudentsToCourse_post);

router.delete('/deleteCourse/:id', courseController.course_delete);

router.get('/addCourse', courseController.addCourse_get);

router.post('/addCourse', courseController.addCourse_post);

router.get('/courses/:id', courseController.courseDetails_get);

router.get('/showStudentCourse/:id', courseController.showStudentCourse_get);

router.get('/showAllRegCourses', courseController.showAllRegCourses_get);

//router.get('/showAllRegCourses_get/:id', courseController.showAllRegCourses_get);

router.get('/addModule/:id', moduleController.addModule_get);

router.get('/manageCourseUsers', courseController.manageCourseUsers_get);

router.post('/addModule', moduleController.addModule_post);

router.delete('/deleteModule', moduleController.deleteModule_delete);

router.get('/module', modulePlayController.launchModule_get);

router.get('/moduleplay', modulePlayController.deliverModule_get);

router.get('/nextquestion', modulePlayController.quizNextQuestion_get);

router.get('/reviewQuiz', modulePlayController.reviewQuiz_get);

router.get('/manageusers', userController.manageusers_get);

router.post('/addUsers', userController.addUsers_post);

router.post('/feedbackFromStudents', feedbackFromStudentsController.feedbackFromStudents_post);

//router.get('/quizsa/:id', quizController.quizStandalone_get);

router.get('/addQuizSA/:id', hierarchicalQuizController.addQuiz_get);

router.post('/addQuizSA', hierarchicalQuizController.addQuiz_post);

router.get('/quizsa', hierarchicalQuizController.launchQuizSA_get);

router.post('/getQuizSAQuestion', hierarchicalQuizController.getQuizQuestion_post);

router.get('/getReviewSA', hierarchicalQuizController.getReviewSA_get);

router.post('/activateQuizSA', hierarchicalQuizController.activateQuizSA_post);

router.get('/updateQuizSA', hierarchicalQuizController.updateQuizSA_get);

router.post('/updateQuizSA', hierarchicalQuizController.updateQuizSA_post);

router.get('/reviewQuizSAWork', hierarchicalQuizController.reviewQuizSAWork_get);

router.get('/downloadQuizSACSV', hierarchicalQuizController.downloadQuizSACSV_get);

module.exports = router;
