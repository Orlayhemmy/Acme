import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ContentContainer from '../contentContainer';
import { getWeekFeedbacks } from '../../actions/feedbackActions';
import { getClassAssignments, getWeekAssignments } from '../../actions/assignmentActions';
import { currentTerm } from '../../actions/termActions';

@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes.classes,
    term: store.term,
    assignments: store.assignment.assignments,
    feedbacks: store.feedback.feedbacks,
  };
})

export default class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      historyWeek: '',
    }
    this.onClick = this.onClick.bind(this);
    this.updateArchive = this.updateArchive.bind(this);
  }
  updateArchive(e) {
    this.props.dispatch(getWeekAssignments(e.target.value));
  }
  onClick(e) {
    this.props.dispatch(getWeekFeedbacks(e.target.id))
    window.open('/assignment', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }
  componentWillMount() {
    this.props.dispatch(currentTerm('1'));
    this.props.dispatch(getWeekFeedbacks(1));
  }
  render() {
    const { weekId, classId, errors, historyWeek } = this.state;
    const subjectClasses = _.map(this.props.classes, (subjectclass) => {
      return (
        <option key={subjectclass.id} value={subjectclass.classId}>{subjectclass.Class.classname}</option>
      );      
    });
    const divColor = "color-orange";
    const Assignments = _.map(this.props.assignments, (assignment) => {
      return (
        <tr key={assignment.assignmentId}>
          <td id={assignment.assignmentId} onClick={this.onClick} className="text-left">{assignment.topic}</td>                 
          <td>{assignment.Class.classname}</td>
          <td><i class="fa fa-remove"></i></td>
        </tr>
      );
    });
    const AssignmentHistory = (
      <div className="table-responsive text-center">
        <h3 className="mt-4 mb-4"><em class="fa fa-tasks"></em> Assessments</h3>
        <div class="form-group">
          <div class="col-12 no-padding">
            <select id="historyWeek" class="form-control" onChange={this.updateArchive}>
              <option>Current Week</option>
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
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Topic</th>
              
              <th>Class</th>
              
              <th>Remove/Delete</th>
            </tr>
          </thead>
          <tbody>
            {Assignments}
          </tbody>
        </table>
      </div>  
    );
 
    const Feedbacks = _.map(this.props.feedbacks, (feedback) => {
      return (
        <tr key={feedback.feedbackId}>
          <td id={feedback.feedbackId} onClick={this.onClick} className="text-left">{feedback.Student.firstname} {feedback.Student.lastname}</td>                 
        </tr>
      );
    });
    const feedbackArchive = ( 
      <div className="table-responsive text-center">
        <h3 className="mt-4 mb-4"><em class="fa fa-list"></em> Feedbacks</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {Feedbacks}
          </tbody>
        </table>
      </div>  
    );
    return (
      <div className="card-block">
        <ContentContainer contentFirst={AssignmentHistory} contentSecond={feedbackArchive} background={divColor}/>
      </div>
    );
  }
}