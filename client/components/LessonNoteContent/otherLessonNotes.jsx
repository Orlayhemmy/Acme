import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import AtomContainer from '../atomContainer';
import { createNote, HODWeekNotes, getNote } from '../../actions/noteActions';
import { currentTerm } from '../../actions/termActions';


@connect((store) => {
  return {
    auth: store.auth,
    term: store.term,
    week: store.week,
    note: store.note,
  };
})

export default class OtherNotes extends React.Component {
  constructor() {
    super();
    this.state = {
      historyWeek: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.updateArchive = this.updateArchive.bind(this);
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
  onClick(e) {
    this.props.dispatch(getNote(e.target.id))
    window.open('/hodviewnote', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }
  componentWillMount() {
    this.props.dispatch(HODWeekNotes(this.props.week.id.value))
  }
  render() {
    const { historyWeek } = this.state;

    const divColor = "color-red";
    const lessonNotes = _.map(this.props.notes, (note) => {
      return (
        <tr key={note.noteId}>
          <td id={note.noteId} onClick={this.onClick} className="text-left">{note.topic}</td>                 
          <td>{note.Class.classname}</td>
          <td><i class="fa fa-remove"></i></td>
        </tr>
      );
    });

    const archive = ( 
      <div className="table-responsive text-center">
        <h3 className="mt-4 mb-4"><em class="fa fa-list"></em> Lesson Note Archive</h3>
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
            {lessonNotes}
          </tbody>
        </table>
      </div>  
    );
    return (
      <div className="card-block">
        <AtomContainer content={archive} background={divColor}/>
      </div>
    );
  }
}