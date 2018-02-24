import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ContentContainer from '../contentContainer';
import { getTeacherClasses } from '../../actions/classActions';
import { createAssignmentValidate } from '../../shared/assignmentValidation';
import { createAssignment, getWeekAssignments, getAssignment } from '../../actions/assignmentActions';
import { currentTerm } from '../../actions/termActions';

@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes.classes,
    term: store.term,
    assignments: store.assignment.assignments,
  };
})

export default class Assignment extends React.Component {
  constructor() {
    super();
    this.state = {
      classId: '',
      weekId: '',
      errors: {},
      historyWeek: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onClick = this.onClick.bind(this);
    this.updateArchive = this.updateArchive.bind(this);
  }
  updateArchive(id) {
    this.props.dispatch(getWeekAssignments(id));
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    if (e.target.id == 'historyWeek') {
      this.updateArchive(e.target.value);
    }
  }
  
  isValid() {
    this.state.termId = this.props.term.currentTerm;
    this.state.staffId = this.props.auth.user.id;
    const { isValid, errors } = createAssignmentValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(createAssignment(this.state));
      window.open('/assignment', 'window', 'toolbar=no, menubar=no, resizable=yes');
    }
  }
  onClick(e) {
    this.props.dispatch(getAssignment(e.target.id))
    window.open('/assignment', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }
  componentWillMount() {
    this.props.dispatch(currentTerm('1'));
    this.props.dispatch(getTeacherClasses(this.props.auth.user.id));
    this.props.dispatch(getWeekAssignments('2'))
  }
  render() {
    const { weekId, classId, errors, historyWeek } = this.state;
    const subjectClasses = _.map(this.props.classes, (subjectclass) => {
      return (
        <option key={subjectclass.id} value={subjectclass.classId}>{subjectclass.Class.classname}</option>
      );      
    });
    const divColor = "color-green";
    const addAssignment = (
      <form class="form-horizontal" onSubmit={this.onSubmit}>
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-plus-circle"></em> Add Assessment</h3>
        <fieldset>
          <div className="help-block">{errors.weekId}</div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Week</label>
            <div class="col-12 no-padding">
              <select id="weekId" class="form-control" onChange={this.onChange}>
                <option>Select Week</option>
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
          <div className="help-block">{errors.classId}</div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Class</label>
            <div class="col-12 no-padding">
              <select id="classId" class="form-control" onChange={this.onChange}>
                <option>Select Class</option>
                {subjectClasses}
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-12 widget-right no-padding">
              <input id="createAssignment" type="submit" class="btn btn-primary btn-md float-right" value="Submit" />
            </div>
          </div>
        </fieldset>
      </form>
    );
 
    const Assignments = _.map(this.props.assignments, (assignment) => {
      return (
        <tr key={assignment.assignmentId}>
          <td id={assignment.assignmentId} onClick={this.onClick} className="text-left">{assignment.topic}</td>                 
          <td>{assignment.Class.classname}</td>
          <td><i class="fa fa-remove"></i></td>
        </tr>
      );
    });
    const archive = ( 
      <div className="table-responsive text-center">
        <h3 className="mt-4 mb-4"><em class="fa fa-tasks"></em> Assessment Archive</h3>
        <div class="form-group">
          <div class="col-12 no-padding">
            <select id="historyWeek" class="form-control" onChange={this.onChange}>
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
    return (
      <div className="card-block">
        <ContentContainer contentFirst={addAssignment} contentSecond={archive} background={divColor}/>
      </div>
    );
  }
}