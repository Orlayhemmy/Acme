import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ContentContainer from '../contentContainer';
import { getTeacherClasses } from '../../actions/classActions';
import { createNoteValidate } from '../../shared/noteValidation';
import { createNote } from '../../actions/noteActions';
import { currentTerm } from '../../actions/termActions';

@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes.classes,
    term: store.term,
  };
})

export default class LessonNote extends React.Component {
  constructor() {
    super();
    this.state = {
      classId: '',
      weekId: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {
    this.state.termId = this.props.term.currentTerm;
    this.state.staffId = this.props.auth.user.id;
    const { isValid, errors } = createNoteValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(createNote(this.state));
      window.open('/note', 'window', 'toolbar=no, menubar=no, resizable=yes');
    }
  }
  componentWillMount() {
    this.props.dispatch(currentTerm('1'));
    this.props.dispatch(getTeacherClasses(this.props.auth.user.id));
  }
  render() {
    const { weekId, classId, errors } = this.state;
    const subjectClasses = _.map(this.props.classes, (subjectclass) => {
      return (
        <option key={subjectclass.id} value={subjectclass.classId}>{subjectclass.Class.classname}</option>
      );      
    });
    const divColor = "color-blue";
    const addNote = (
      <form class="form-horizontal" onSubmit={this.onSubmit}>
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-plus-circle"></em> Add Note</h3>
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
              <input id="createNote" type="submit" class="btn btn-primary btn-md float-right" value="Submit" />
            </div>
          </div>
        </fieldset>
      </form>
    );
    
    const archive = ( 
      <div className="table-responsive text-center">
        <h3 className="mt-4 mb-4"><em class="fa fa-list"></em> Note Archive</h3>
        <div class="form-group">
          <select id="history_week" class="form-control">
            <option value="0">Current Week</option>
          </select>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              
              <th>Topic</th>
              
              <th>Class</th>
              
              <th>Remove/Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              
              <td>Plotting of Graph</td>
                                        
              <td>Grade 9</td>
              <td><i class="fa fa-recycle"></i></td>
            </tr>
            
            <tr>
              <td>2</td>
              
              <td>Factorization</td>
              
              <td>Grade 7</td>
              <td><i class="fa fa-recycle"></i></td>
            </tr>
            
            <tr>
              <td>3</td>
              
              <td>Equations</td>
              
              <td>Grade 8</td>
              
              <td><i class="fa fa-recycle"></i></td>
            </tr>
          </tbody>
        </table>
      </div>  
    );
    return (
      <div className="card-block">
        <ContentContainer contentFirst={addNote} contentSecond={archive} background={divColor}/>
      </div>
    );
  }
}