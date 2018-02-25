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
import setAuthToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import { setCurrentNote } from './actions/noteActions';
import { setCurrentTerm } from './actions/termActions';
import { setCurrentWeek } from './actions/weekActions';



if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if (localStorage.noteId) {
  store.dispatch(setCurrentNote(localStorage.noteId));
}
if (localStorage.termId) {
  store.dispatch(setCurrentTerm(localStorage.termId));
}
if (localStorage.weekId) {
  store.dispatch(setCurrentWeek(localStorage.weekId));
}
// if (localStorage.centerId) {
//   store.dispatch(setCurrentCenter(localStorage.centerId));
// }
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
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('app')
);