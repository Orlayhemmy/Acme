import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import jwt from 'jsonwebtoken';


// import store from './store';
// import allReducers from './reducers/reducersIndex';
import HomePage from './components/homepage';
import Dashboard from './components/dashboard';
import TestArea from './components/testArea';
import Library from './components/library';
import LessonNote from './components/lessonNotePage';
import Assessment from './components/assessmentPage';
import Report from './components/reportPage';
import SpreadSheet from './components/spreadSheetPage';
// import setAuthToken from './utils/setAuthorizationToken';
// import PasswordRecovery from './components/passwordRecoveryPage';
// import Profile from './components/profile';
// import { setCurrentUser } from './actions/signInActions';
// import { setCurrentEvent } from './actions/eventActions';
// import { setCurrentCenter } from './actions/centerActions';
// import style from './sass/style.scss';
// import Image from './components/imageUpload';


// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
// }
// if (localStorage.eventId) {
//   store.dispatch(setCurrentEvent(localStorage.eventId));
// }
// if (localStorage.centerId) {
//   store.dispatch(setCurrentCenter(localStorage.centerId));
// }
//put component into html page
ReactDOM.render(
  <Provider>
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
        {/* <Route exact path="/imageupload" component={Image} />
        <Route exact path="/view-centers" component={CentersPage} />
        <Route exact path="/add-center" component={AddCenterPage} />
        <Route exact path="/about" component={AboutPage} /> 
        <Route exact path="/admin-centers" component={AdminPanelPage} />
        <Route exact path="/dashboard" component={UserPanel} />
        <Route exact path="/add-event" component={AddEvent} />
        <Route exact path="/modify-event" component={ModifyEvent} />
        <Route exact path="/view-center-event" component={ViewCenter} />
        <Route exact path="/recover-password" component={PasswordRecovery} />
        <Route exact path="/profile" component={Profile} /> */}
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('app')
);