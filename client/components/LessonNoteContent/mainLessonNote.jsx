import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import ContentContainer from '../contentContainer';
import { getTeacherClasses } from '../../actions/classActions';
import { createNoteValidate } from '../../shared/noteValidation';
import { createNote, getWeekNotes, getNote, deleteNote, modifyNote } from '../../actions/noteActions';


@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes.classes,
    term: store.term,
    week: store.week,
    note: store.note,
  };
})

export default class LessonNote extends React.Component {
  constructor() {
    super();
    this.state = {
      classId: '',
      weekId: '',
      errors: {},
      historyWeek: '',
      topic: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updateArchive = this.updateArchive.bind(this);
    this.uploadNote = this.uploadNote.bind(this);
  }
  onDelete(e) {
    if (confirm("Are you sure you want to delete the note")) {
      this.props.dispatch(deleteNote(e.target.id, this.props.week.id.value));
    }
  }
  updateArchive(id) {
    this.props.dispatch(getWeekNotes(id));
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
    this.state.termId = this.props.term.id.value;
    const { isValid, errors } = createNoteValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(createNote(this.state, this.props.week.id.value));
      window.open('/note', 'window', 'toolbar=no, menubar=no, resizable=yes');
    }
  }
  
  onClick(e) {
    this.props.dispatch(getNote(e.target.id));
    window.open('/note', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }

  componentWillMount() {
    this.props.dispatch(getTeacherClasses(this.props.auth.user.id));
    this.props.dispatch(getWeekNotes(this.props.week.id.value));
  }
  componentDidUpdate() {
    if (this.props.note.message === 'Note Deleted') {
      alert(this.props.note.message);
    }     
  }
  uploadNote(e) {
    if (confirm("Are you sure you want to upload note")) {
      const data = {
        upload: true,
        weekId: this.props.week.id.value,
        topic: e.target.parentNode.id,
        lastname: this.props.auth.user.lastname,
      }
      this.props.dispatch(modifyNote(e.target.id, data));
    }
    
  }
  render() {
    let content;
    const { notes } = this.props.note;
    const { weekId, classId, errors, historyWeek, topic } = this.state;
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
          <div className="help-block">{errors.topic}</div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Topic</label>  
            <div class="col-12 no-padding">
              <input  type="text" id="topic" class="form-control" onChange={this.onChange}/>
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
 
    const lessonNotes = _.map(notes, (note) => {
      let uploadColor;
      if (note.upload) {
        uploadColor = "fa fa-upload";
      } else {
        uploadColor = "fa fa-download";
      }
      return (
        <tr key={note.noteId}>
          <td id={note.noteId} onClick={this.onClick} className="text-left">{note.topic}</td>                 
          <td>{note.Class.classname}</td>
          <td id={note.topic}><em onClick={this.uploadNote} id={note.noteId} class={uploadColor}></em></td>
          <td><i class="fa fa-trash" onClick={this.onDelete} id={note.noteId}></i></td>
        </tr>
      );
    });

    if (isEmpty(notes)) {
      content = (
        <div className="col-lg-12 mb-4 mt-4 text-center">
          <div className="notice">
            <h2><span className="color-white"><b>No Lesson Note Found</b></span></h2>
          </div>
        </div>  
      );
    } else {
      content = (
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Topic</th>
              
              <th>Class</th>
              <th>Status</th>
              
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {lessonNotes}
          </tbody>
        </table>
      );
    }
    const archive = ( 
      <div className="table-responsive">
        <h3 className="mt-4 mb-4"><em class="fa fa-list"></em> Note Archive</h3>
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
        {content}
      </div>  
    );
    return (
      <div className="card-block">
        <ContentContainer contentFirst={addNote} contentSecond={archive} background={divColor}/>
      </div>
    );
  }
}