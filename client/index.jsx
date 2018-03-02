import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';


import store from './store';
import HomePage from './components/homepage';
import Dashboard from './components/dashboard';
import TestArea from './components/testArea';
import Library from './components/library';
import LessonNote from './components/lessonNotePage';
import Assessment from './components/assessmentPage';
import Report from './components/reportPage';
import SpreadSheet from './components/spreadSheetPage';
import Note from './components/notePage';
import Settings from './components/settings';
import WriteAssessment from './components/writeAssessment';
import StudentDashboard from './components/studentDashboard';
import StudentNote from './components/studentNotePage';
import NewTest from './components/newTest';
import Questions from './components/questionsPage';
import NewQuestion from './components/newQuestion';
import EditQuestion from './components/editQuestion';
import setAuthToken from './utils/setAuthorizationToken';
import StudentViewNote from './components/studentViewNote';
import StudentAssignment from './components/studentAssessmentPage';
import StudentViewAssignment from './components/studentViewAssignment';
import StudentTestArea from './components/studentTestArea';
import { setCurrentUser } from './actions/authActions';
import { setCurrentNote } from './actions/noteActions';
import { setCurrentTerm } from './actions/termActions';
import { setCurrentWeek } from './actions/weekActions';
import { setCurrentAssignment } from './actions/assignmentActions';
import { setCurrentTest } from './actions/testActions';
import { setCurrentQuestion } from './actions/questionActions';
import { setCurrentFeedback } from './actions/feedbackActions';




if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if (localStorage.note) {
  store.dispatch(setCurrentNote(jwt.decode(localStorage.note)));
}
if (localStorage.termId) {
  store.dispatch(setCurrentTerm(localStorage.termId));
}
if (localStorage.weekId) {
  store.dispatch(setCurrentWeek(localStorage.weekId));
}
if (localStorage.assignment) {
  store.dispatch(setCurrentAssignment(jwt.decode(localStorage.assignment)));
}
if (localStorage.test) {
  store.dispatch(setCurrentTest(jwt.decode(localStorage.test)));
}
if (localStorage.question) {
  store.dispatch(setCurrentQuestion(jwt.decode(localStorage.question)));
}
if (localStorage.feedback) {
  store.dispatch(setCurrentFeedback(jwt.decode(localStorage.feedback)));
}

//put component into html page
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/test-area" component={TestArea} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/lessonnote" component={LessonNote} />
        <Route exact path="/assessments" component={Assessment} />
        <Route exact path="/spreadsheet" component={SpreadSheet} />
        <Route exact path="/report" component={Report} />
        <Route exact path="/note" component={Note} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/assignment" component={WriteAssessment} />
        <Route exact path="/newtest" component={NewTest} />
        <Route exact path="/studentdashboard" component={StudentDashboard} />
        <Route exact path="/studentnote" component={StudentNote} />
        <Route exact path="/testquestions" component={Questions} />
        <Route exact path="/addquestion" component={NewQuestion} />
        <Route exact path="/editquestion" component={EditQuestion} />
        <Route exact path="/studentviewnote"  component={StudentViewNote} />
        <Route exact path="/studentassignment" component={StudentAssignment} />
        <Route exact path="/studentviewassignment" component={StudentViewAssignment} />
        <Route exact path="/studenttestarea" component={StudentTestArea} />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('app')
);