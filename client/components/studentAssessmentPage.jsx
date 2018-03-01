import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import Container from './containerStudentPage';
import { getStudentWeekAssignments, getStudentAssignment } from '../actions/assignmentActions';
import { getFeedback } from '../actions/feedbackActions';

@connect((store) => {
  return {
    auth: store.auth,
    assignment: store.assignment,
    week: store.week,
  };
})

export default class StudentAssignment extends React.Component {
  constructor() {
    super();
    this.state = {
      weekId: '',
    }
    this.updateArchive = this.updateArchive.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  
  onClick(e) {
    this.props.dispatch(getStudentAssignment(e.target.id));
    this.props.dispatch(getFeedback(e.target.id));
    window.open('/studentviewassignment', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }
  updateArchive(e) {
    this.props.dispatch(getStudentWeekAssignments(e.target.value));
  }
  componentWillMount() {
    this.props.dispatch(getStudentWeekAssignments(this.props.week.id.value))
  }
  render() {
    const { weekId } = this.state;
    let content;
    const { assignments } = this.props.assignment;
    if (isEmpty(assignments)) {
      content = (
        <div className="col-lg-12 mb-4 mt-4 text-center">
          <div className="notice">
            <h2><b>No Assignment Uploaded</b></h2>
          </div>
        </div>  
      );
    } else {
      content = _.map(assignments, (assignment) => {
        return (
          <div class="col-lg-4 mb-4" key={assignment.assignmentId}>
            <div class="card card-inverse card-primary">
              <div class="card-header">
              {assignment.Subject.subjectname} 
              <em className="fa fa-eye float-right" onClick={this.onClick} id={assignment.assignmentId}></em>
              </div>
              <div class="card-block">
                <p><b>{assignment.topic}</b>
                <br/>{assignment.preview}</p>
              </div>
            </div>
          </div>
        );
      });
    }
   
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Assignment"/>
          <section className="row">
            <div class="col-sm-12">
              <section class="row">
                <div class="col-md-12 col-lg-12">								
                  <div class="card mb-4">
                    <div class="card-block">
                      <h3 class="card-title">Assignments</h3>
                      <h6 class="card-subtitle mb-2 text-muted">Class Assignments</h6>
                      <div class="divider"></div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <select id="weekId" onChange={this.updateArchive} class="form-control">
                            <option value={this.props.week.id.value}>Current Week</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                        </div>
                      </div>
                      <section className="row">
                        {content}
                      </section>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}